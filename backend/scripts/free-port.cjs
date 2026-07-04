// Frees the backend port before `npm run dev` starts (wired as the `predev` script).
//
// WHY: two recurring local-dev failure modes both end in `EADDRINUSE`:
//   1. nodemon on Windows (especially under Git Bash) sometimes fails to kill
//      its ts-node child on Ctrl+C / terminal close — the orphan keeps holding
//      the port forever.
//   2. running `npm run dev` at the repo root (which already starts the
//      backend via concurrently) and then again inside backend/.
// Instead of crashing, we find whatever is LISTENing on our port, verify it is
// one of *our* backend processes (we never kill an unrelated app), kill it,
// and let the new dev server start cleanly.
//
// Plain .cjs (not TS): this must run before ts-node is even involved, and a
// tooling script doesn't justify a compile step.

require('dotenv').config();
const { execSync } = require('node:child_process');

const PORT = Number(process.env.PORT ?? 4000);

// execSync wrapper: "no matches" exits non-zero in netstat/findstr/lsof — for
// us that just means "nothing to do", not an error.
function sh(cmd) {
   try {
      return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
   } catch {
      return '';
   }
}

function listeningPids() {
   if (process.platform === 'win32') {
      // netstat line: "  TCP    [::]:4001    [::]:0    LISTENING    26572"
      const pids = new Set();
      for (const line of sh('netstat -ano -p TCP').split(/\r?\n/)) {
         const m = line.trim().match(/^TCP\s+\S+:(\d+)\s+\S+\s+LISTENING\s+(\d+)$/);
         if (m && Number(m[1]) === PORT) pids.add(Number(m[2]));
      }
      return [...pids];
   }
   return sh(`lsof -ti tcp:${PORT} -sTCP:LISTEN`)
      .split(/\s+/)
      .filter(Boolean)
      .map(Number);
}

function commandLine(pid) {
   if (process.platform === 'win32') {
      // wmic is removed on recent Windows 11 builds — query CIM via PowerShell.
      return sh(
         `powershell -NoProfile -Command "(Get-CimInstance Win32_Process -Filter 'ProcessId=${pid}').CommandLine"`
      ).trim();
   }
   return sh(`ps -p ${pid} -o command=`).trim();
}

// Only kill processes that are clearly this backend (ts-node/node running this
// repo's backend entrypoint). Anything else on the port is NOT ours to kill.
function isOurBackend(cmd) {
   const c = cmd.toLowerCase().replace(/\\/g, '/');
   return (
      (c.includes('ts-node') && c.includes('src/index.ts')) ||
      c.includes('backend/dist/index.js') ||
      (c.includes('node') && c.includes('portfolio_main/backend'))
   );
}

function kill(pid) {
   if (process.platform === 'win32') {
      sh(`taskkill /PID ${pid} /T /F`);
   } else {
      try {
         process.kill(pid, 'SIGKILL');
      } catch {
         /* already gone */
      }
   }
}

for (const pid of listeningPids()) {
   const cmd = commandLine(pid);
   if (isOurBackend(cmd)) {
      kill(pid);
      console.log(
         `[predev] Port ${PORT} was held by a previous backend instance (PID ${pid}) — killed it.\n` +
            `[predev] If \`npm run dev\` is also running at the repo root, its backend was just\n` +
            `[predev] replaced by this one — run only one of the two.`
      );
   } else {
      console.warn(
         `[predev] Port ${PORT} is used by an UNRELATED process (PID ${pid}):\n` +
            `[predev]   ${cmd || '<command line unavailable>'}\n` +
            `[predev] Not killing it. Stop it yourself or change PORT in backend/.env.`
      );
   }
}

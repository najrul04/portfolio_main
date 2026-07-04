// Load env BEFORE any other import that reads process.env (e.g. ./lib/jwt).
import 'dotenv/config';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { prisma } from './lib/prisma';
import { getUserFromRequest } from './middleware/auth.middleware';
import imagesRouter from './routes/images';
import type { GraphQLContext } from './context';

const PORT = Number(process.env.PORT ?? 4000);
// Allow multiple comma-separated origins so we can dev against both Vite (:5173)
// and any future Next.js (:3000) frontend without editing config.
const CORS_ORIGINS = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://localhost:3000')
   .split(',')
   .map((s) => s.trim())
   .filter(Boolean);

const start = async () => {
   const app = express();
   const httpServer = http.createServer(app);

   const server = new ApolloServer<GraphQLContext>({
      typeDefs,
      resolvers,
      // Drain plugin lets in-flight requests finish during shutdown instead of
      // being killed mid-flight. Important for any production deploy.
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
   });

   await server.start();

   app.use(
      '/graphql',
      cors<cors.CorsRequest>({ origin: CORS_ORIGINS, credentials: true }),
      express.json({ limit: '2mb' }), // markdown post bodies can be large
      expressMiddleware(server, {
         // Per-request context: parse JWT once, hand prisma + user to every resolver.
         context: async ({ req }) => ({
            prisma,
            user: getUserFromRequest(req),
         }),
      })
   );

   // Image upload/serve (REST). GraphQL is great for structured data; HTTP
   // multipart is the right tool for binary transfer. Both share the same
   // JWT secret + auth helper, just via different middleware styles.
   // NOTE: mounted AFTER cors but BEFORE express.json — multer reads multipart
   // bodies; if json runs first it consumes the stream.
   app.use(cors<cors.CorsRequest>({ origin: CORS_ORIGINS, credentials: true }), imagesRouter);

   // Liveness probe — useful for Docker/Render/etc. health checks.
   app.get('/health', (_req, res) => {
      res.json({ status: 'ok' });
   });

   // Reject (instead of crashing with an unhandled 'error' event) so the catch
   // below can turn EADDRINUSE into an actionable message rather than a stack trace.
   await new Promise<void>((resolve, reject) => {
      httpServer.once('error', reject);
      httpServer.listen({ port: PORT }, resolve);
   });
   console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);

   // WHY: on Windows (especially under Git Bash) an abrupt exit can leave the
   // process alive holding the port — the classic EADDRINUSE-on-next-start bug.
   // Closing the server explicitly on shutdown signals makes exit deterministic.
   const shutdown = () => {
      httpServer.close(() => process.exit(0));
      setTimeout(() => process.exit(0), 3000).unref(); // failsafe: don't hang on stuck sockets
   };
   process.on('SIGINT', shutdown);
   process.on('SIGTERM', shutdown);
};

start().catch((err: NodeJS.ErrnoException) => {
   if (err.code === 'EADDRINUSE') {
      console.error(
         [
            `✗ Port ${PORT} is already in use — another backend instance is running.`,
            `  Most likely cause: \`npm run dev\` at the repo root already starts the`,
            `  backend; don't start it again inside backend/.`,
            `  The predev script normally frees the port automatically — if you still`,
            `  see this, something unrelated owns port ${PORT} (see backend/scripts/free-port.cjs output).`,
         ].join('\n')
      );
   } else {
      console.error('Failed to start server:', err);
   }
   process.exit(1);
});

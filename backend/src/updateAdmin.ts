import 'dotenv/config';
import { prisma } from './lib/prisma';
import { hashPassword } from './lib/password';

// Updates the admin's email + password (or creates one if none exists).
// Reads from env so credentials never get committed to the script itself.
//
// Usage (Bash):
//   ADMIN_EMAIL_NEW=you@example.com ADMIN_PASSWORD_NEW=YourPw npm run -w backend admin:update
//
// Usage (PowerShell):
//   $env:ADMIN_EMAIL_NEW="you@example.com"; $env:ADMIN_PASSWORD_NEW="YourPw"; npm run -w backend admin:update

const main = async () => {
   const email = process.env.ADMIN_EMAIL_NEW;
   const password = process.env.ADMIN_PASSWORD_NEW;

   if (!email || !password) {
      console.error('Set ADMIN_EMAIL_NEW and ADMIN_PASSWORD_NEW env vars before running.');
      process.exit(1);
   }

   const passwordHash = await hashPassword(password);

   // Single-admin design: update the only row if it exists, otherwise create it.
   // findFirst (not findUnique by email) so a rename also works.
   const existing = await prisma.admin.findFirst();

   if (existing) {
      await prisma.admin.update({
         where: { id: existing.id },
         data: { email, passwordHash },
      });
      console.log(`✓ Admin updated → ${email}`);
   } else {
      await prisma.admin.create({ data: { email, passwordHash } });
      console.log(`✓ Admin created → ${email}`);
   }
};

main()
   .catch((err) => {
      console.error('Update failed:', err);
      process.exit(1);
   })
   .finally(() => prisma.$disconnect());

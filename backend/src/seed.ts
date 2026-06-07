import 'dotenv/config';
import crypto from 'crypto';
import { prisma } from './lib/prisma';
import { hashPassword } from './lib/password';

// Generates a 24-character URL-safe random password.
// Why generate (not hardcode): the seed script is committed; a hardcoded
// password would be a permanent backdoor. Forces the user to copy what's
// printed and store it somewhere safe (password manager).
const generatePassword = (): string =>
   crypto.randomBytes(18).toString('base64url');

const main = async () => {
   const email = process.env.ADMIN_EMAIL ?? 'admin@najrul.com';

   const existing = await prisma.admin.findUnique({ where: { email } });
   if (existing) {
      console.log(`✓ Admin "${email}" already exists. Skipping seed.`);
      console.log('  (delete the row in Prisma Studio to re-seed with a new password)');
      return;
   }

   const password = generatePassword();
   const passwordHash = await hashPassword(password);

   await prisma.admin.create({ data: { email, passwordHash } });

   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
   console.log('✓ Admin user created');
   console.log(`  email:    ${email}`);
   console.log(`  password: ${password}`);
   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
   console.log('⚠  Save this password now — it will not be shown again.');
};

main()
   .catch((err) => {
      console.error('Seed failed:', err);
      process.exit(1);
   })
   .finally(() => prisma.$disconnect());

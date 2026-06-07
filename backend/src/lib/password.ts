import bcrypt from 'bcryptjs';

// Cost factor 10 = ~100ms per hash on modern hardware.
// Why not higher: at 12+ admin login starts feeling sluggish; for a single-admin
// site with a strong password, 10 is the standard balance.
const SALT_ROUNDS = 10;

export const hashPassword = (plain: string): Promise<string> =>
   bcrypt.hash(plain, SALT_ROUNDS);

export const verifyPassword = (plain: string, hash: string): Promise<boolean> =>
   bcrypt.compare(plain, hash);

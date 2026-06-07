import jwt, { SignOptions } from 'jsonwebtoken';

// Read these once at module load — fail fast on misconfig instead of
// silently signing tokens with `undefined` (which jsonwebtoken accepts).
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

if (!JWT_SECRET) {
   throw new Error('JWT_SECRET is not set. Add it to backend/.env');
}

export interface TokenPayload {
   userId: string;
   email: string;
}

export const signToken = (payload: TokenPayload): string => {
   const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] };
   return jwt.sign(payload, JWT_SECRET, options);
};

// Returns the payload on success, null on any failure (expired, malformed, bad signature).
// Why null instead of throw: callers (auth middleware) treat "no token" and "bad token"
// the same way — both result in unauthenticated context.
export const verifyToken = (token: string): TokenPayload | null => {
   try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      return decoded;
   } catch {
      return null;
   }
};

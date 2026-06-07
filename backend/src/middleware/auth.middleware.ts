import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type TokenPayload } from '../lib/jwt';

// Extracts the JWT from the Authorization header and returns the decoded user, or null.
// Lives outside the middleware chain because Apollo Server 4 builds GraphQL context
// per-request — we call this from the context fn directly.
export const getUserFromRequest = (req: Request): TokenPayload | null => {
   const header = req.headers.authorization;
   if (!header) return null;

   // Expected format: "Bearer <token>"
   const [scheme, token] = header.split(' ');
   if (scheme !== 'Bearer' || !token) return null;

   return verifyToken(token);
};

// Express middleware variant for REST routes (image upload).
// Why a separate helper: GraphQL resolvers throw GraphQLError; REST routes
// send back JSON with a status code. Same JWT verification, different response style.
export interface AuthedRequest extends Request {
   user?: TokenPayload;
}

export const requireRestAuth = (req: AuthedRequest, res: Response, next: NextFunction) => {
   const user = getUserFromRequest(req);
   if (!user) {
      return res.status(401).json({ error: 'Unauthenticated' });
   }
   req.user = user;
   next();
};

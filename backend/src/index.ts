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

   await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
   console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
};

start().catch((err) => {
   console.error('Failed to start server:', err);
   process.exit(1);
});

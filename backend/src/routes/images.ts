import { Router, type Request, type Response, type NextFunction } from 'express';
import multer from 'multer';
import { prisma } from '../lib/prisma';
import { requireRestAuth } from '../middleware/auth.middleware';

const router = Router();

// 5MB cap — generous enough for most photos, small enough to keep DB rows
// reasonable. Above this, force users to compress (or, in the future, swap
// to an object store).
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

// memoryStorage = file kept as a Buffer in RAM instead of written to disk first.
// At 5MB max this is fine; for huge files you'd switch to diskStorage + stream
// from disk to Postgres to keep memory flat.
const upload = multer({
   storage: multer.memoryStorage(),
   limits: { fileSize: MAX_UPLOAD_BYTES },
   fileFilter: (_req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
         // Multer's typings want `cb(null, false)` for "reject", or `cb(error)` for crash.
         // We pass an Error so the route's error handler can return a clean 400.
         cb(new Error('Only image files are allowed'));
         return;
      }
      cb(null, true);
   },
});

// POST /images — admin-only upload. Multipart field name: "image".
router.post(
   '/images',
   requireRestAuth,
   // We catch multer errors via an arrow wrapper so file-too-large / wrong-mime
   // become 400 JSON responses instead of unhandled exceptions.
   (req: Request, res: Response, next: NextFunction) => {
      upload.single('image')(req, res, (err: unknown) => {
         if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
         }
         if (err instanceof Error) {
            return res.status(400).json({ error: err.message });
         }
         next();
      });
   },
   async (req: Request, res: Response) => {
      const file = req.file;
      if (!file) {
         return res.status(400).json({ error: 'No file uploaded (expected field name "image")' });
      }

      const image = await prisma.image.create({
         data: {
            filename: file.originalname,
            mimeType: file.mimetype,
            data: file.buffer,
            size: file.size,
         },
         select: { id: true, filename: true, mimeType: true, size: true, createdAt: true },
      });

      // Build absolute URL the client can drop straight into markdown.
      // Why absolute (not relative): the markdown rendered on /blog/[slug] needs to
      // work even if the frontend is ever hosted on a different origin from the API.
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      res.status(201).json({
         ...image,
         url: `${baseUrl}/images/${image.id}`,
      });
   }
);

// GET /images/:id — public. Streams the bytes with proper Content-Type so
// browsers render it inside <img> tags natively.
router.get('/images/:id', async (req: Request, res: Response) => {
   const image = await prisma.image.findUnique({
      where: { id: req.params.id },
   });
   if (!image) {
      return res.status(404).json({ error: 'Image not found' });
   }

   // Image IDs are UUIDs that never change → safe to cache aggressively.
   // `immutable` tells the browser it never needs to revalidate.
   res.set('Content-Type', image.mimeType);
   res.set('Content-Length', image.size.toString());
   res.set('Cache-Control', 'public, max-age=31536000, immutable');
   res.send(image.data);
});

export default router;

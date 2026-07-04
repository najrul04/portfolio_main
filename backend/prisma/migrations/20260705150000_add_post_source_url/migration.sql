-- Optional link back to the original social post (LinkedIn/FB/Instagram…).
-- Platform is derived from the URL hostname on the frontend, so one nullable
-- column is all the schema needs.
ALTER TABLE "Post" ADD COLUMN "sourceUrl" TEXT;

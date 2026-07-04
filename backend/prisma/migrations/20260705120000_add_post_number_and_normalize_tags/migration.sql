-- 1) Post.number — human-facing sequential number in creation order.
--    Backfill existing rows ordered by createdAt so #1 is the first post ever,
--    THEN enforce NOT NULL + UNIQUE. New rows get max+1 from the resolver.
ALTER TABLE "Post" ADD COLUMN "number" INTEGER;

WITH ordered AS (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt" ASC) AS rn
  FROM "Post"
)
UPDATE "Post" p
SET "number" = o.rn
FROM ordered o
WHERE p."id" = o."id";

ALTER TABLE "Post" ALTER COLUMN "number" SET NOT NULL;
CREATE UNIQUE INDEX "Post_number_key" ON "Post"("number");

-- 2) Normalize legacy tag data. Tags were sometimes saved as ONE string like
--    '#SoftwareDevelopment #WebDevelopment' (the form only split on commas).
--    Split every element on commas/whitespace, strip leading '#', drop empties,
--    dedupe. Going forward the createPost/updatePost resolvers normalize input,
--    so this is a one-time repair of existing rows.
UPDATE "Post"
SET "tags" = COALESCE(
  (
    SELECT array_agg(DISTINCT clean.part)
    FROM unnest("tags") AS raw(tag),
         LATERAL regexp_split_to_table(raw.tag, '[,\s]+') AS split(part),
         LATERAL (SELECT btrim(split.part, '# ')) AS clean(part)
    WHERE clean.part <> ''
  ),
  '{}'
)
WHERE "tags" <> '{}';

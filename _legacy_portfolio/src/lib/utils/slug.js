// Generates a URL-safe slug from a post title.
// Conservative on purpose: only ASCII alphanumerics + hyphens.
// If the title is non-Latin (Bengali, Arabic, etc.), we fall back to a timestamp
// so the post still saves — admin can hand-edit the slug field.
export const generateSlug = (title) => {
   const ascii = title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '') // strip combining diacritics
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

   if (!ascii) return `post-${Date.now()}`;
   return ascii;
};

import { gql } from '@apollo/client';

// All queries live here — never inlined in components.
// Why: a) easy to grep when the schema changes, b) prevents drift where two
// components query the same data with different field selections.

// Public — published posts, paginated. The envelope (items + totalPages etc)
// lets the list render page numbers without a second round-trip.
// thumbnailUrl is server-computed: explicit coverImage if set, else first
// image from the post content.
export const POSTS = gql`
   query Posts($page: Int, $perPage: Int) {
      posts(page: $page, perPage: $perPage) {
         items {
            id
            title
            slug
            excerpt
            thumbnailUrl
            # Fetched so the card can render a content preview when the post
            # has no thumbnail. Trade-off: list responses get bigger. Acceptable
            # for a personal blog (handful of posts); if the corpus grows, add
            # a backend preview field that returns first N chars stripped.
            content
            tags
            createdAt
         }
         total
         page
         perPage
         totalPages
         hasNext
         hasPrev
      }
   }
`;

// Public — full content for a single post (used when reading inline).
export const POST_BY_SLUG = gql`
   query Post($slug: String!) {
      post(slug: $slug) {
         id
         title
         slug
         content
         excerpt
         coverImage
         tags
         createdAt
         updatedAt
      }
   }
`;

// Admin — every post, including drafts. Requires auth header.
export const ALL_POSTS = gql`
   query AllPosts {
      allPosts {
         id
         title
         slug
         excerpt
         tags
         published
         createdAt
         updatedAt
      }
   }
`;

// Admin — full post by id, used to pre-fill the edit form.
export const POST_BY_ID = gql`
   query PostById($id: ID!) {
      postById(id: $id) {
         id
         title
         slug
         content
         excerpt
         coverImage
         tags
         published
         createdAt
         updatedAt
      }
   }
`;

// GraphQL schema. Single source of truth for the API contract.
// Why one big string instead of .graphql files: keeps the build simple
// (no loader, no codegen step) and lets editor TS hover work via the `gql` tag.

export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    slug: String!
    content: String!
    excerpt: String!
    coverImage: String
    # Computed field: prefers the explicit coverImage, else the first image found
    # inside the markdown content. Lets the list view show a thumbnail without
    # the author having to set a cover separately.
    thumbnailUrl: String
    tags: [String!]!
    published: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    email: String!
  }

  # Paginated post list. Why an envelope type (not just [Post]):
  # the client needs the total count to render page numbers without
  # firing a second query.
  type PostsPage {
    items: [Post!]!
    total: Int!
    page: Int!
    perPage: Int!
    totalPages: Int!
    hasNext: Boolean!
    hasPrev: Boolean!
  }

  input PostInput {
    title: String!
    slug: String!
    content: String!
    excerpt: String!
    coverImage: String
    tags: [String!]!
    published: Boolean
  }

  type Query {
    # Public — only published posts, paginated, newest first.
    # Defaults: page 1, 10 per page. Caller can override via variables.
    posts(page: Int, perPage: Int): PostsPage!
    # Public — single published post by slug
    post(slug: String!): Post
    # Admin only — every post including drafts
    allPosts: [Post!]!
    # Admin only — used by the edit page to load by id
    postById(id: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createPost(input: PostInput!): Post!
    updatePost(id: ID!, input: PostInput!): Post!
    deletePost(id: ID!): Boolean!
    togglePublish(id: ID!): Post!
  }
`;

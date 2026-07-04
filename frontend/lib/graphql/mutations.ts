import { gql } from '@apollo/client';

// Centralized mutations — same DRY rule as queries.

export const LOGIN = gql`
   mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
         token
         email
      }
   }
`;

export const CREATE_POST = gql`
   mutation CreatePost($input: PostInput!) {
      createPost(input: $input) {
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

export const UPDATE_POST = gql`
   mutation UpdatePost($id: ID!, $input: PostInput!) {
      updatePost(id: $id, input: $input) {
         id
         title
         slug
         excerpt
         tags
         published
         updatedAt
      }
   }
`;

export const DELETE_POST = gql`
   mutation DeletePost($id: ID!) {
      deletePost(id: $id)
   }
`;

export const TOGGLE_PUBLISH = gql`
   mutation TogglePublish($id: ID!) {
      togglePublish(id: $id) {
         id
         published
         updatedAt
      }
   }
`;

import { gql } from "@apollo/client";

// USER

export const FETCH_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      isEmailVerified
      role
      createdAt
      email
      updatedAt
      username
    }
  }
`;

// POST

export const FETCH_POSTS = gql`
  query GetPosts($skip: Int!, $userId: ID) {
    getPosts(skip: $skip, userId: $userId) {
      id
      username
      body
      commentCount
      likeCount
      createdAt
      userId
      comments {
        id
        body
        createdAt
        username
      }
      likes {
        username
      }
    }
    getTotalPostCount(userId: $userId)
  }
`;

export const FETCH_POST = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      userId
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const POST_COUNT = gql`
  query GetTotalPostCount($userId: ID) {
    getTotalPostCount(userId: $userId)
  }
`;

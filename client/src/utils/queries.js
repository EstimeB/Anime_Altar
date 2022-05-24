import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postDescription
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postDescription
      postTitle
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postDescription
      postTitle
      createdAt
      comments {
        _id
        commentDescription
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        postDescription
        postTitle
        createdAt
      }
    }
  }
`;

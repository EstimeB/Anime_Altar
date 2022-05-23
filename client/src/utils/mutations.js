import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postDescription: String!) {
    addPost(postDescription: $postDescription) {
      _id
      postDescription
      postTitle
      createdAt
      comments {
        _id
        commentDescription
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentDescription: String!) {
    addComment(postId: $postId, commentDescription: $commentDescription) {
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

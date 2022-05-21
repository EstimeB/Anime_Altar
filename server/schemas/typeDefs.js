const { gql } = require('apollo-server-express');

// Type definition for Post and User
const typeDefs = gql`
 # Define which fields are accessible from the Class model
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
  }

  type Post {
    _id: ID
    postTitle: String
    postDescription: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentTitle: String
    commentDescription: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postDescription: String!): Post
    addComment(postId: ID!, commentDescription: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;

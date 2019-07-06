const {gql} = require('apollo-server');

module.exports = gql`
   type Post {
       id: ID!
       body: String!
       username: String!
       createdAt: String!
       comments: [Comment]!
       likes: [Like]!
       likeCount: Int!
       commentCount: Int!
    }

    type Comment{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Like{
        id: ID!
        username: String!
        createdAt: String!
    }

   type Query {
       getPosts: [Post]
       getPost(postId: ID!): Post
    }

   type User {
       id: ID!
       email: String!
       token: String!
       username: String!
       createdAt: String!
    }

   input RegisterInput{
       username: String!
       email: String!
       password: String!
       confirmPassword: String!
    }

   input LoginInput{
       username: String!
       password: String!
    }

   type Mutation {
       register(registerInput: RegisterInput): User!
       login(loginInput: LoginInput): User!
       createPost(body: String!): Post!
       deletePost(postId: ID!): String!
       createComment(postId: ID!, body: String!): Post!
       deleteComment(postId: ID!, commentId: String!): Post!
       likePost(postId: ID!): Post!
    }`;
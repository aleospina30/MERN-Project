import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type Query {
    user(filter: User_filter): [User]
    login(input: Login_input!): String
  }

  type Mutation {
    User_save(input: User_input): User
    User_delete(_id: String!): Boolean
  }
 
  type User {
    _id: ID
    name: String
    docIdentity: String
    username: String
    email: String
    deletedAt: Int
    projects: [Project]
  }

  input User_input {
    _id: String
    name: String
    docIdentity: String
    username: String
    email: String
    password: String
  }

  input User_filter {
    _id: String
    docIdentity: String
  }

  input Login_input{
    email: String!
    password: String!
  }
`;

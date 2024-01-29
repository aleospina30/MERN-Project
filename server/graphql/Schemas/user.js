import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type Query {
    user(filter: User_filter): [User]
    login(input: Login_input!): [User]
  }

  type Mutation {
    userCreate(input: User_input): User
    userUpdate(input: User_input): User
    userDelete(_id: String!): Boolean
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

  input User_filter{
    _id: String
    docIdentity: String
  }

  input Login_input{
    email:String!
    password: String!
  }
`;

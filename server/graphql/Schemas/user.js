import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type Query {
    user(filter: User_filter): [User]
  }

  type Mutation {
    userCreate(input: User_input): User
  }

  type User {
    _id: ID
    name: String
    docIdentity: String
    username: String
    email: String
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
`;

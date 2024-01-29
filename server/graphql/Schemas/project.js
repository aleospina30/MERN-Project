import { gql } from "graphql-tag";

export const projectTypeDefs = gql`
  type Query {
    project(_id: ID): [Project]
  }
  type Mutation {
    project_create(input: Project_input): Project
    project_delete(_id: String!): Boolean
    project_update(input: Project_input): Project
  }

  type Project {
    _id: ID
    name: String
    user: User
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
    deletedAt: Int
  }

  input Project_input {
    _id: String
    userId: String
    name: String
    description: String
  }
`;

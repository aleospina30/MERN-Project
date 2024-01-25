import { gql } from "graphql-tag";

export const projectTypeDefs = gql`
  type Query {
    project(_id: ID): [Project]
  }
  type Mutation {
    projectCreate(input: Project_input): Project
    projectDelete(_id: ID!): Boolean
    projectUpdate(input: Project_input): Project
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  input Project_input {
    _id: String
    name: String
    description: String
  }
`;

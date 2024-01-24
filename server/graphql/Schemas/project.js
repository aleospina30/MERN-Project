import { gql } from "graphql-tag";

export const projectTypeDefs = gql`
  type Query {
    project(_id: ID): [Project]
  }
  type Mutation {
    createProject(input: Project_input): Project
    deleteProject(_id: ID!): Boolean
    updateProject(input: Project_input): Project
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

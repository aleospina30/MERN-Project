import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    project(_id: ID): [Project]
    
    task(_id: ID!): [Task]
  }

  type Mutation {
    createProject(input: Project_input): Project
    deleteProject(_id: ID!): Boolean
    updateProject(input: Project_input):Project
    createTask(input: Task_input): Task
    deleteTask(_id: ID!): Boolean
    updateTask(input: Task_input):Task
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String
    project: Project
    createdAt: String
    updatedAt: String
  }

  input Project_input{
    _id: String
    name: String
    description: String
  }

  input Task_input{
    _id: String
    title: String
    projectId: String
  }
  
`

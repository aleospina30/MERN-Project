import { gql } from "graphql-tag";

export const taskTypeDefs = gql`
    type Query {
        task(_id: ID): [Task]
    }

    type Mutation {
    createTask(input: Task_input): Task
    deleteTask(_id: ID!): Boolean
    updateTask(input: Task_input):Task 
    }

    type Task {
    _id: ID
    title: String
    project: Project
    comments: [String]
    createdAt: String
    updatedAt: String
  }

  input Task_input{
    _id: String
    title: String
    projectId: String
    comment: String
  }
`
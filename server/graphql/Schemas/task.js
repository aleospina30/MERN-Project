import { gql } from "graphql-tag";

export const taskTypeDefs = gql`
    type Query {
        task(_id: ID): [Task]
    }

    type Mutation {
    taskCreate(input: Task_input): Task
    taskDelete(_id: ID!): Boolean
    taskUpdate(input: Task_input):Task 
    }

    type Task {
    _id: ID
    title: String
    project: Project
    comments: [String]
    createdAt: String
    updatedAt: String
    deletedAt: Int
  }

  input Task_input{
    _id: String
    title: String
    projectId: String
    comment: String
  }
`
import { gql } from "graphql-tag";

export const taskTypeDefs = gql`
  type Query {
    task(filter: Task_filter): [Task]
  }

  type Mutation {
    Task_save(input: Task_input): Task
    Task_delete(_id: ID!): Boolean
    Task_comment(taskId: String!,body: String!): Comment
  }

  type Task {
    _id: ID
    title: String
    description: String
    project: Project
    comments: [Comment]
    status: Statuses
    createdAt: String
    updatedAt: String
    deletedAt: Int
    projectId: String
    isRemove: Boolean
  }

  type Comment {
    _id: String
    body: String
  }


  input Task_filter {
    _id: ID
    status: Statuses
    isRemove: Boolean
  }

  input Task_input {
    _id: String
    title: String
    description: String
    projectId: String
    status: Statuses
  }

  enum Statuses {
    PENDING
    IN_PROCESS
    COMPLETED
  }

`;
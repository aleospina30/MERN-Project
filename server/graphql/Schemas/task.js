import { gql } from "graphql-tag";

export const taskTypeDefs = gql`
  type Query {
    task(filter: Task_filter): [Task]
  }

  type Mutation {
    task_save(input: Task_input): Task
    task_delete(_id: ID!): Boolean
  }

  type Task {
    _id: ID
    title: String
    description: String
    project: Project
    comments: [String]
    status: Statuses
    createdAt: String
    updatedAt: String
    deletedAt: Int
  }

  input Task_filter {
    _id: ID
    status: Statuses
  }

  input Task_input {
    _id: String
    title: String
    description: String
    projectId: String
    status: Statuses
    comment: String
  }

  enum Statuses {
    PENDING
    IN_PROCESS
    COMPLETED
  }
`;
import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
query Project($id: ID) {
  project(_id: $id) {
    _id
    createdAt
    description
    name
    updatedAt
    tasks {
      _id
      createdAt
      title
      updatedAt
    }
  }
}
`;

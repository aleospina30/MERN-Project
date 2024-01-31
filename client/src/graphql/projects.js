import { gql } from "@apollo/client";

export const GET_projectModelS = gql`
query projectModel($id: ID) {
  projectModel(_id: $id) {
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

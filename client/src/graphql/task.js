import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation Task_save($input: Task_input) {
    Task_save(input: $input) {
      title
      description
      projectId
    }
  }
`;

export const DELETE_TASK = gql`
  mutation Task_delete($id: ID!) {
    Task_delete(_id: $id)
  }
`;

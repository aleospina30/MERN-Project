import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query Projects {
    projects {
      _id
      name
      description
    }
  }
`;

export const GET_PROJECT = gql`
  query Projects($id: ID) {
  projects(_id: $id) {
    _id
    name
    description
    createdAt
    tasks {
      _id
      title
      description
      status
      createdAt
    }
  }
}
`

export const CREATE_PROJECT = gql`
  mutation Project_save($input: Project_input) {
    Project_save(input: $input) {
      _id
      name
      description
    }
  }
`;

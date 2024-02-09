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

export const CREATE_PROJECT = gql`
  mutation Project_save($input: Project_input) {
    Project_save(input: $input) {
      _id
      name
      description
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query Project {
    project {
      _id
      name
      description
    }
  }
`;

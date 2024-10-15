import { gql } from "@apollo/client";

export const GET_FULLREPOS = gql`
  query GetFullRepos($id: String) {
    fullrepos(id: $id) {
      id
      name
      comments {
        comment
        repos_id
        id
      }
    }
  }
`;

export const GET_REPOS = gql`
  query GetOneRepos($id: String) {
    fullrepos(id: $id) {
      langs {
        id
        label
      }
      name
      status {
        label
        id
      }
      url
      id
    }
    fulllangs {
      id
      label
    }
  }
`;

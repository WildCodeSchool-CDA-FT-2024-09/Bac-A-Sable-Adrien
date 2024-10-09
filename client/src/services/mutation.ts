import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateNewComment($data: CommentInput!) {
    createNewComment(data: $data) {
      repos_id
      comment
    }
  }
`;

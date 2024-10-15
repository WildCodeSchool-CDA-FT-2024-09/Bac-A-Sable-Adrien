import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateNewComment($data: CommentInput!) {
    createNewComment(data: $data) {
      repos_id
      comment
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeletComment($id: Float!) {
    deletComment(id: $id)
  }
`;

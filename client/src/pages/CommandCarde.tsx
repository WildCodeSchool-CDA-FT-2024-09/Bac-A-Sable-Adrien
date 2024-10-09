import { useParams } from "react-router-dom";
import { Comments } from "../types/commentType";
import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { CREATE_COMMENT } from "../services/mutation";

const GET_REPOS = gql`
  query ($id: String) {
    fullrepos(id: $id) {
      id
      name
      comments {
        comment
        repos_id
      }
    }
  }
`;

function CommentCard() {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_REPOS, {
    variables: { id },
  });

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error</p>;

  const filteredRepos = data.fullrepos[0];

  return (
    <div>
      <h1>Les commentaires pour {filteredRepos.name}</h1>
      <div className="Mapcomment">
        {filteredRepos.comments.map((comment: Comments) => (
          <div key={comment.repos_id} className="comment">
            {comment.comment}
          </div>
        ))}
      </div>
      <CommentForm currentRepoId={filteredRepos.id} refetch={refetch} />
    </div>
  );
}

const CommentForm = ({ currentRepoId, refetch }) => {
  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: (data) => {
      console.log("Commentaire créé:", data);
      setComment("");
      refetch();
    },
    onError: (error) => {
      console.error("Erreur lors de la création du commentaire:", error);
    },
  });

  const handleComment = async (e) => {
    e.preventDefault();
    console.log("Envoi du commentaire :", { repos_id: currentRepoId, comment });

    await createComment({
      variables: {
        data: {
          repos_id: currentRepoId,
          comment: comment,
        },
      },
    });
  };

  return (
    <form onSubmit={handleComment}>
      <div>Ajoute un commentaire !</div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Écris ton comm ici !"
      />
      <button type="submit">Envoyer !</button>
    </form>
  );
};

export default CommentCard;

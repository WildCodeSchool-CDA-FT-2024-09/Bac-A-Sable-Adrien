import { useParams } from "react-router-dom";
import { Comments } from "../types/commentType";
import { useState } from "react";
import {
  useDeletCommentMutation,
  useGetFullReposQuery,
  useCreateNewCommentMutation,
} from "../generated/graphql-types";

function CommentCard() {
  const { id } = useParams();
  const { loading, error, data, refetch } = useGetFullReposQuery({
    variables: { id },
  });
  const [deletComment] = useDeletCommentMutation();
  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error</p>;
  if (!data || !data.fullrepos || data.fullrepos.length === 0) {
    return <p>No repository found</p>;
  }
  const filteredRepos = data.fullrepos[0];
  console.log("data", data);

  const handleDeletComent = async (commentId: number) => {
    try {
      const response = await deletComment({ variables: { id: commentId } });

      console.log("suprimer en front");
      refetch();
    } catch (error) {
      console.error("erreur en front lors de la supression", error.message);
    }
  };

  return (
    <div>
      <h1>Les commentaires pour {filteredRepos.name}</h1>
      <div className="Mapcomment">
        {filteredRepos.comments.map(
          (comment: {
            __typename?: "Comment" | undefined;
            comment: string;
            repos_id: string;
            id: string;
          }) => (
            <>
              <div key={comment.id} className="comment">
                {comment.comment}
              </div>
              <button
                onClick={() => handleDeletComent(parseInt(comment.id, 10))}
              >
                x
              </button>
            </>
          )
        )}
      </div>
      <CommentForm currentRepoId={filteredRepos.id} refetch={refetch} />
    </div>
  );
}

const CommentForm = ({ currentRepoId, refetch }) => {
  const [comment, setComment] = useState("");

  const [createComment] = useCreateNewCommentMutation({
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

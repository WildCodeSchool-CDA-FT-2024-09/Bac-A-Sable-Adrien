import { useLoaderData, useParams } from "react-router-dom";
import connexion from "../services/connexion";
import { Comments } from "../types/commentType";
import { useState } from "react";

function CommentCard() {
  const { id } = useParams();
  const commentsd = useLoaderData() as Comments;
  console.log(commentsd);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    try {
      await connexion.post(`/api/comment`, {
        comment: comment,
        repos_id: id,
      });
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Les commentaire</h1>

      <div className="Mapcomment">
        {commentsd.map((comments: Comments) => (
          <div className="comment"> {comments.comment}</div>
        ))}
      </div>
      <div> Ajoute un commentaire !</div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Ecrit ton comm ici!"
      />
      <button onClick={handleComment}>Envoyer!</button>
    </div>
  );
}

export const CommentCardLoader = async ({ params }) => {
  const { id } = params;
  try {
    const comment = await connexion.get<Comments[]>(`api/comment/${id}`);
    console.log(comment.data);
    return comment.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default CommentCard;

import { Comment } from "../entities/comment";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";

@InputType()
class CommentInput implements Partial<Comment> {
  @Field()
  repos_id: string;

  @Field()
  comment: string;
}

@Resolver(Comment)
export default class CommentResolver {
  @Mutation(() => Comment)
  async createNewComment(@Arg("data") newComment: CommentInput) {
    try {
      // Création du nouveau commentaire
      const comment = new Comment();
      comment.repos_id = newComment.repos_id;
      comment.comment = newComment.comment;

      await comment.save();

      const mycomment = await Comment.findOneOrFail({
        where: { repos_id: newComment.repos_id },
        relations: ["repos"],
      });

      return mycomment;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw new Error("Failed to create comment");
    }
  }

  @Mutation(() => Boolean)
  async deletComment(@Arg("id") id: number): Promise<boolean> {
    try {
      const comment = await Comment.findOneOrFail({
        where: { id },
      });

      await Comment.remove(comment);
      console.log(`le Commentaire avec l'id ${id} a bien étais suprimer`);
      return true;
    } catch (error) {
      console.error(`Erreur pour suprimer le commentaire ${id}`, error);
      return false;
    }
  }
}

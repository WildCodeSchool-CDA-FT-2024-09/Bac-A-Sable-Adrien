import express, { Response, Request } from "express";
import { Comment } from "../entities/comment"; // Importation de l'entité Comment
import { validate } from "class-validator";

const commentControllers = express.Router();

// Récupérer tous les commentaires, avec la relation vers le repo associée
commentControllers.get("/", async (_: any, res: Response) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Récupérer un commentaire spécifique par ID
// commentControllers.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const comment = await Comment.findOneBy({ id: +req.params.id });
//     if (comment) {
//       res.status(200).json(comment);
//     } else {
//       res.status(404).json({ message: "Comment not found" });
//     }
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });
commentControllers.get("/:id", async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ where: { repos_id: req.params.id } });

    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: "No comments found for this repository" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

// Créer un nouveau commentaire
commentControllers.post("/", async (req: Request, res: Response) => {
  try {
    const newComment = new Comment();

    newComment.comment = req.body.comment;
    newComment.repos_id = req.body.repos_id; // Lier le commentaire à un repo, assure-toi que l'ID du repo est correct

    const error = await validate(newComment);
    if (error.length > 0) {
      res.status(422).json(error);
    } else {
      await newComment.save();

      res.send(newComment);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

// Mettre à jour un commentaire par ID
commentControllers.put("/:id", async (req: Request, res: Response) => {
  try {
    const commentToUpdate = await Comment.findOneBy({ id: +req.params.id });

    if (commentToUpdate) {
      const updatedComment = { ...commentToUpdate, ...req.body };
      await Comment.save(updatedComment);
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

// Supprimer un commentaire par ID
commentControllers.delete("/:id", async (req: Request, res: Response) => {
  try {
    const commentToDelete = await Comment.findOneBy({ id: +req.params.id });
    if (commentToDelete) {
      await Comment.remove(commentToDelete);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default commentControllers;

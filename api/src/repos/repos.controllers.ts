import express, { Response, Request } from "express";
import { Repo } from "../entities/repos";
import { validate } from "class-validator";

const repoControllers = express.Router();

repoControllers.get("/", async (_: any, res: Response) => {
  try {
    const repo = await Repo.find();
    res.status(200).json(repo);
  } catch (error) {
    res.sendStatus(500);
  }
});

repoControllers.get("/:id", async (req: Request, res: Response) => {
  try {
    const repo = await Repo.findOneBy({ id: req.params.id });

    if (repo) {
      res.status(200).json(repo);
    } else {
      res.status(404).json({ message: "Repo not found" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

repoControllers.post("/", async (req: Request, res: Response) => {
  try {
    const ad = new Repo();
    ad.id = req.body.id;
    ad.isPrivate = req.body.isPrivate;
    ad.name = req.body.name;
    ad.url = req.body.url;
    const error = await validate(ad);
    if (error.length > 0) {
      res.status(422).json(error);
    } else {
      await ad.save();

      res.send(ad);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

repoControllers.put("/:id", async (req: Request, res: Response) => {
  try {
    const repoUpdate = await Repo.findOneBy({ id: req.params.id });

    if (repoUpdate) {
      const updatedRepo = { ...repoUpdate, ...req.body };
      await Repo.save(updatedRepo);
      res.status(200).json(updatedRepo);
    } else {
      res.status(404).json({ message: "Repo not found" });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

repoControllers.delete("/:id", async (req: Request, res: Response) => {
  try {
    const repoDelete = await Repo.findOneBy({ id: req.params.id });

    if (repoDelete) {
      await Repo.remove(repoDelete);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default repoControllers;

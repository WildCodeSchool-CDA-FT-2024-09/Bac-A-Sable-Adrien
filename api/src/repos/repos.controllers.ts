import express, { Response, Request } from "express";
import { Repo } from "../entities/repos";
// import { validate } from "class-validator";
import { Statu } from "../entities/status";
import { Lang } from "../entities/langs";
import { In } from "typeorm";

const repoControllers = express.Router();

repoControllers.get("/", async (_: any, res: Response) => {
  try {
    const repo = await Repo.find({
      relations: {
        isPrivate: true,
        langs: true,
      },
    });
    res.status(200).json(repo);
  } catch (error) {
    res.sendStatus(500);
  }
});

repoControllers.get("/:id", async (req: Request, res: Response) => {
  try {
    const repo = await Repo.findOne({
      where: { id: req.params.id },
      relations: { langs: true },
    });

    if (repo) {
      res.status(200).json(repo);
    } else {
      res.status(404).json({ message: "Repo not found" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

repoControllers.post("/", async (req: Request, res: Response) => {
  try {
    const ad = new Repo();
    ad.id = req.body.id;
    ad.name = req.body.name;
    ad.url = req.body.url;

    const status = await Statu.findOneOrFail({
      where: { id: req.body.isPrivate },
    });

    ad.isPrivate = status;

    const langs = await Lang.find({
      where: { id: In(req.body.langs.map((l: number) => l)) },
    });

    ad.langs = langs;

    await ad.save();
    res.status(201).json(ad);
    console.log(ad);
  } catch (error) {
    console.error(error);
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

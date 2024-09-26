import express, { Response, Request } from "express";

import repos from "../../data/repos.json";
import type { Repo } from "./repo.type";

const validateRepo = require("./repo.middlewares");
let myRepos: Array<Repo> = repos;

const repoControllers = express.Router();

repoControllers.get("/", (_: any, res: Response) => {
  res.status(200).json(myRepos);
});

repoControllers.get("/:id", (req: Request, res: Response) => {
  const repo = myRepos.find((rep) => rep.id === req.params.id) as Repo;

  if (repo) {
    res.status(200).json(repo);
  } else {
    res.sendStatus(404);
  }
});

repoControllers.post("/", validateRepo, (req: Request, res: Response) => {
  myRepos.push(req.body);
  res.status(201).json(req.body);
});

repoControllers.put("/:id", validateRepo, (req: Request, res: Response) => {
  const updatedRepos = myRepos.map((repo: Repo) =>
    repo.id === req.params.id ? { ...repo, ...req.body } : repo
  );

  myRepos = updatedRepos;
  res.status(200).json(req.body);
});

repoControllers.delete("/:id", (req: Request, res: Response) => {
  myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id);
  res.sendStatus(204);
});

export default repoControllers;

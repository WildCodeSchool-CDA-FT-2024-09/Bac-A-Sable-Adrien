import express, { Response, Request } from "express";

import repos from "../../data/repos.json";
import type { Repo } from "./repo.type";

const validateRepo = require("./repo.middlewares");
const repoControllers = express.Router();

repoControllers.get("/", (_: any, res: Response) => {
  res.status(200).json(repos);
});

repoControllers.get("/:id", (req: Request, res: Response) => {
  const repo = repos.find((rep) => rep.id === req.params.id) as Repo;

  if (repo) {
    res.status(200).json(repo);
  } else {
    res.sendStatus(404);
  }
});

repoControllers.post("/", validateRepo, (req: Request, res: Response) => {
  repos.push(req.body);
  res.status(201).json(req.body);
});

export default repoControllers;

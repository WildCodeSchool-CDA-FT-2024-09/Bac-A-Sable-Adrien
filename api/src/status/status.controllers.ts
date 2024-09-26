import express, { Response, Request } from "express";
import status from "../../data/status.json";
import type { Statu } from "./statu.type";

const validateStatu = require("./statu.middlewares");
let myStatus: Array<Statu> = status;

const statuControllers = express.Router();

statuControllers.get("/", (_: any, res: Response) => {
  res.status(200).json(myStatus);
});

statuControllers.get("/:id", (req: Request, res: Response) => {
  const statu = myStatus.find((rep) => rep.id === +req.params.id) as Statu;

  if (statu) {
    res.status(200).json(statu);
  } else {
    res.sendStatus(404);
  }
});

statuControllers.post("/", validateStatu, (req: Request, res: Response) => {
  myStatus.push(req.body);
  res.status(201).json(req.body);
});

statuControllers.delete("/:id", (req: Request, res: Response) => {
  myStatus = myStatus.filter((statu: Statu) => statu.id !== +req.params.id);
  res.sendStatus(204);
});

export default statuControllers;

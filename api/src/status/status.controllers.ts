import express, { Response, Request } from "express";
import status from "../../data/status.json";
import type { Statu } from "./statu.type";

const validateStatu = require("./statu.middlewares");
const statuControllers = express.Router();

statuControllers.get("/", (_: any, res: Response) => {
  res.status(200).json(status);
});

statuControllers.get("/:id", (req: Request, res: Response) => {
  const statu = status.find((rep) => rep.id === +req.params.id) as Statu;

  if (statu) {
    res.status(200).json(statu);
  } else {
    res.sendStatus(404);
  }
});

statuControllers.post("/", validateStatu, (req: Request, res: Response) => {
  status.push(req.body);
  res.status(201).json(req.body);
});

export default statuControllers;

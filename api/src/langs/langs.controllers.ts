import express, { Response, Request } from "express";
import langs from "../../data/langs.json";
import type { Lang } from "./lang.type";

const validateLang = require("./lang.middlewares");
const langControllers = express.Router();

langControllers.get("/", (_: any, res: Response) => {
  res.status(200).json(langs);
});

langControllers.get("/:id", (req: Request, res: Response) => {
  const lang = langs.find((rep) => rep.id === +req.params.id) as Lang;

  if (lang) {
    res.status(200).json(lang);
  } else {
    res.sendStatus(404);
  }
});

langControllers.post("/", validateLang, (req: Request, res: Response) => {
  langs.push(req.body);
  res.status(201).json(req.body);
});

export default langControllers;

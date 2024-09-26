import express, { Response, Request } from "express";
import langs from "../../data/langs.json";
import type { Lang } from "./lang.type";

const validateLang = require("./lang.middlewares");
let myLangs: Array<Lang> = langs;

const langControllers = express.Router();

langControllers.get("/", (_: any, res: Response) => {
  res.status(200).json(myLangs);
});

langControllers.get("/:id", (req: Request, res: Response) => {
  const lang = myLangs.find((rep) => rep.id === +req.params.id) as Lang;

  if (lang) {
    res.status(200).json(lang);
  } else {
    res.sendStatus(404);
  }
});

langControllers.post("/", validateLang, (req: Request, res: Response) => {
  myLangs.push(req.body);
  res.status(201).json(req.body);
});

langControllers.delete("/:id", (req: Request, res: Response) => {
  myLangs = myLangs.filter((lang: Lang) => lang.id !== +req.params.id);
  res.sendStatus(204);
});

export default langControllers;

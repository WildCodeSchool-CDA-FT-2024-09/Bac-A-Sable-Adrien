import express, { Response, Request } from "express";
import { Lang } from "../entities/langs";
import { validate } from "class-validator";

const langControllers = express.Router();

langControllers.get("/", async (_: any, res: Response) => {
  try {
    const lang = await Lang.find();
    res.status(200).json(lang);
  } catch (error) {
    res.sendStatus(500);
  }
});

langControllers.get("/:id", async (req: Request, res: Response) => {
  try {
    const lang = await Lang.findOneBy({ id: +req.params.id });
    if (lang) {
      res.status(200).json(lang);
    } else {
      res.status(404).json({ message: "Lang not fund" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

langControllers.post("/", async (req: Request, res: Response) => {
  try {
    const ad = new Lang();
    ad.id = req.body.id;
    ad.label = req.body.label;
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

langControllers.put("/:id", async (req: Request, res: Response) => {
  try {
    const langUpdate = await Lang.findOneBy({ id: +req.params.id });

    if (langUpdate) {
      const updatedLang = { ...langUpdate, ...req.body };
      await Lang.save(updatedLang);
      res.status(200).json(updatedLang);
    } else {
      res.status(404).json({ message: "Lang not found" });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

langControllers.delete("/:id", async (req: Request, res: Response) => {
  try {
    const langDelete = await Lang.findOneBy({ id: +req.params.id });
    if (langDelete) {
      await Lang.remove(langDelete);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default langControllers;

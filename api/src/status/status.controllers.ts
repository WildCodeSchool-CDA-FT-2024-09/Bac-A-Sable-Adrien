import express, { Response, Request } from "express";
import { Statu } from "../entities/status";
import { validate } from "class-validator";

const statuControllers = express.Router();

statuControllers.get("/", async (_: any, res: Response) => {
  try {
    const statu = await Statu.find();
    res.status(200).json(statu);
  } catch (error) {
    res.sendStatus(500);
  }
});

statuControllers.get("/:id", async (req: Request, res: Response) => {
  try {
    const statu = await Statu.findOneBy({ id: +req.params.id });
    if (statu) {
      res.status(200).json(statu);
    } else {
      res.status(404).json({ message: "Statu not fund" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

statuControllers.post("/", async (req: Request, res: Response) => {
  try {
    const ad = new Statu();
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

statuControllers.put("/:id", async (req: Request, res: Response) => {
  try {
    const statuUpdate = await Statu.findOneBy({ id: +req.params.id });

    if (statuUpdate) {
      const updatedStatu = { ...statuUpdate, ...req.body };
      await Statu.save(updatedStatu);
      res.status(200).json(updatedStatu);
    } else {
      res.status(404).json({ message: "Statu not found" });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

statuControllers.delete("/:id", async (req: Request, res: Response) => {
  try {
    const statuDelete = await Statu.findOneBy({ id: +req.params.id });
    if (statuDelete) {
      await Statu.remove(statuDelete);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default statuControllers;

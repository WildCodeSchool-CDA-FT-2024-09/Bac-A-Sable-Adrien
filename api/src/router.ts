import express from "express";
import { Response } from "express";
import repoControllers from "./repos/repos.controllers";
import langControllers from "./langs/langs.controllers";
import statuControllers from "./status/status.controllers";
import commentControllers from "./comments/comment.controllers";

const router = express.Router();

router.get("/", (_, res: Response) => {
  console.log(res);
  res.send("Hello wilders");
});

router.use("/repos", repoControllers);
router.use("/lang", langControllers);
router.use("/statu", statuControllers);
router.use("/comment", commentControllers);

export default router;

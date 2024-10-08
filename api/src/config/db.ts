import { DataSource } from "typeorm";
import { Repo } from "../entities/repos";
import { Statu } from "../entities/status";
import { Lang } from "../entities/langs";
import { Comment } from "../entities/comment";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./data/database.sqlite",
  entities: [Repo, Statu, Lang, Comment],
  synchronize: true,
});

import { DataSource } from "typeorm";
import { Repo } from "../entities/repos";
import { Statu } from "../entities/status";
import { Lang } from "../entities/langs";
import { Comment } from "../entities/comment";

// export const dataSource = new DataSource({
//   type: "sqlite",
//   database: "./data/database.sqlite",
//   entities: [Repo, Statu, Lang, Comment],
//   synchronize: true,
// });
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

export const dataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [Repo, Statu, Lang, Comment],
  synchronize: true,
});
dataSource
  .initialize()
  .then(() => {
    console.log("Data source has been initialized!");
  })
  .catch((error) =>
    console.log("Error during Data Source initialization", error)
  );

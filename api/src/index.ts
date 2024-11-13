import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { dataSource } from "./config/db";
import "reflect-metadata";

// import repos from "../data/repos.json";
import RepoResolver from "./repos/repo.resolvers";
import LangResolver from "./langs/lang.resolvers";
import CommentResolver from "./comments/comment.resolvers";
import * as dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, LangResolver, CommentResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();

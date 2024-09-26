import express from "express";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", router);

const port = process.env.APP_PORT;

if (!port) {
  throw new Error("APP_PORT n'est pas défini dans le fichier .env");
}

console.log(`Port utilisé: ${port}`);

app.listen(parseInt(port), () => {
  console.log(`Serveur is listening on http://localhost:${port}`);
});

import express from "express";
import router from "./router";
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement

const app = express();

app.use("/api", router);

// Récupérer le port depuis les variables d'environnement
const port = process.env.APP_PORT;

if (!port) {
  throw new Error("APP_PORT n'est pas défini dans le fichier .env");
}

console.log(`Port utilisé: ${port}`);

app.listen(parseInt(port), () => {
  console.log(`Serveur is listening on http://localhost:${port}`);
});

import { Link } from "react-router-dom";
import type { Repo } from "../types/reposType";

function CardRepo({ name, url, isPrivate, id }: Repo) {
  return (
    <>
      <h1>{name}</h1>
      <h2>{url}</h2>
      <div>{isPrivate === 1 ? "Privé" : "Public"}</div>
      <Link to={`/detail/${id}`}>Plus d'info!</Link>
    </>
  );
}

export default CardRepo;

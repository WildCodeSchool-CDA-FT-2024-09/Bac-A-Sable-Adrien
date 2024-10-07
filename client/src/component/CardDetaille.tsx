import { Link, useLoaderData, useParams } from "react-router-dom";
import connexion from "../services/connexion";
import { Repo } from "../types/reposType";
import { Langs } from "../types/langsType";

function CardDetaille() {
  const { id } = useParams();
  const reposd = useLoaderData() as Repo;
  console.log(reposd);

  const langAll = reposd.langs;
  console.log(langAll);

  return (
    <div>
      <h1>Card Detail for ID: {id}</h1>
      <div>
        nom : {reposd.name} url : {reposd.url}
      </div>
      <div className="MapLang">
        {langAll.map((langs: Langs) => (
          <div className="Lang">Language : {langs.label}</div>
        ))}
      </div>
      <Link to={`/detail/commente/${id}`}>Voir les commentaires!</Link>
    </div>
  );
}

export const CardDetailleLoader = async ({ params }) => {
  const { id } = params;
  try {
    const repos = await connexion.get<Repo[]>(`api/repos/${id}`);
    console.log(repos.data);
    return repos.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default CardDetaille;

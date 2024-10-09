import { Link, useParams } from "react-router-dom";
// import connexion from "../services/connexion";
// import { Repo } from "../types/reposType";
import { Langs } from "../types/langsType";
// useLoaderData,
import { useQuery, gql } from "@apollo/client";

const GET_REPOS = gql`
  query ($id: String) {
    fullrepos(id: $id) {
      langs {
        id
        label
      }
      name
      status {
        label
        id
      }
      url
      id
    }
    fulllangs {
      id
      label
    }
  }
`;
function CardDetaille() {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_REPOS, {
    variables: { id },
  });
  // const reposd = useLoaderData() as Repo;
  // console.log(reposd);

  // console.log(langAll);
  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error</p>;

  const filteredRepos = data.fullrepos;
  const langAll = filteredRepos[0].langs;
  return (
    <div>
      <h1>Card Detail for ID: {id}</h1>
      <div>
        nom : {filteredRepos[0].name} url : {filteredRepos[0].url}
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

// export const CardDetailleLoader = async ({ params }) => {
//   const { id } = params;
//   try {
//     const repos = await connexion.get<Repo[]>(`api/repos/${id}`);
//     console.log(repos.data);
//     return repos.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export default CardDetaille;

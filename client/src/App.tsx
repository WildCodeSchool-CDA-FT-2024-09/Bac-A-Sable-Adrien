import "./App.scss";
import CardRepo from "./component/CardRepo";
import { Repo } from "./types/reposType";
import { Langs } from "./types/langsType";
import Navbare from "./component/Navbare";
import { useGetOneReposQuery } from "./generated/graphql-types";
import { useState } from "react";

function App() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const { loading, error, data, refetch } = useGetOneReposQuery();

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error</p>;

  const filteredRepos = selectedLang
    ? data.fullrepos.filter((repo: Repo) =>
        repo.langs.some((lang: Langs) => lang.label === selectedLang)
      )
    : data.fullrepos;

  return (
    <>
      <main>
        <div className="Title">Mes Repo Github teste</div>

        <div className="NavMap">
          {data.fulllangs.map((langs: Langs) => (
            <button
              key={langs.id}
              className="nav-label"
              onClick={() => setSelectedLang(langs.label)}
            >
              <Navbare label={langs.label} />
            </button>
          ))}
        </div>

        <div className="MapCard">
          {filteredRepos.map((repo: Repo) => (
            <div className="Card" key={repo.id}>
              <CardRepo
                name={repo.name}
                url={repo.url}
                status={repo.status.label}
                id={repo.id}
                langs={[]}
              />
            </div>
          ))}
        </div>

        <button onClick={() => setSelectedLang(null)}>
          Réinitialiser filtre
        </button>
        <button onClick={refetch}>reset?</button>
      </main>
    </>
  );
}

export default App;

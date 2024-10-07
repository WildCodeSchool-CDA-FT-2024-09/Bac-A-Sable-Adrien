import "./App.scss";

import CardRepo from "./component/CardRepo";
import connexion from "./services/connexion";
import { Repo } from "./types/reposType";
import { Langs } from "./types/langsType";
import { useEffect, useState } from "react";
import Navbare from "./component/Navbare";

function App() {
  const [reposd, setReposd] = useState<Repo[]>([]);

  const [allLangs, setAllLangs] = useState<Langs[]>([]);

  const [langParams, setLangParams] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await connexion.get<Repo[]>("api/repos");
        setReposd(repos.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, []);

  useEffect(() => {
    const fetchAllLangs = async () => {
      try {
        const langs = await connexion.get<Langs[]>("api/lang"); // Remplace par ton endpoint pour récupérer les langues
        setAllLangs(langs.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllLangs();
  }, []);

  useEffect(() => {
    const fetchLangRepos = async () => {
      try {
        if (langParams) {
          const repos = await connexion.get<Repo[]>(
            `api/repos/lang/${langParams}`
          );
          setReposd(repos.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLangRepos();
  }, [langParams]);

  const handleLangClick = (label: string) => {
    setLangParams(label);
  };
  return (
    <>
      <main>
        <div className="Title">Mes Repo Github</div>
        <div className="NavMap">
          {allLangs.map((langs: Langs) => (
            <button
              key={langs.id}
              className="nav-label"
              onClick={() => handleLangClick(langs.label)}
            >
              <Navbare label={langs.label} />
            </button>
          ))}
        </div>
        <div className="MapCard">
          {reposd.map((repo: Repo) => (
            <div className="Card">
              <CardRepo
                name={repo.name}
                url={repo.url}
                isPrivate={repo.isPrivate}
                id={repo.id}
                langs={[]}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

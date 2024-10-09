//  import connexion from "./services/connexion";
//  import { useEffect, useState } from "react";

//  const [reposd, setReposd] = useState<Repo[]>([]);

//   const [allLangs, setAllLangs] = useState<Langs[]>([]);

//   const [langParams, setLangParams] = useState("");

//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         const repos = await connexion.get<Repo[]>("api/repos");
//         setReposd(repos.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchRepos();
//   }, []);

//   useEffect(() => {
//     const fetchAllLangs = async () => {
//       try {
//         const langs = await connexion.get<Langs[]>("api/lang"); // Remplace par ton endpoint pour récupérer les langues
//         setAllLangs(langs.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAllLangs();
//   }, []);

//   useEffect(() => {
//     const fetchLangRepos = async () => {
//       try {
//         if (langParams) {
//           const repos = await connexion.get<Repo[]>(
//             `api/repos/lang/${langParams}`
//           );
//           setReposd(repos.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchLangRepos();
//   }, [langParams]);

//   const handleLangClick = (label: string) => {
//     setLangParams(label);
//   };

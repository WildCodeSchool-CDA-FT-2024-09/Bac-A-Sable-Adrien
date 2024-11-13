import { dataSource } from "../src/config/db";

import { Lang } from "../src/entities/langs";
import langs from "./langs.json";

import { Statu } from "../src/entities/status";
import status from "./status.json";

import { Repo } from "../src/entities/repos";
import repos from "./repos.json";
import lang_by_repo from "./lang_by_repo.json";

import { Comment } from "../src/entities/comment";
import comments from "./comment.json";

(async () => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    // Vider les tables et réinitialiser les séquences
    try {
      await queryRunner.query("TRUNCATE lang CASCADE RESTART IDENTITY");
      console.log("Truncated lang table successfully.");
    } catch (error) {
      console.error("Error truncating lang:", error);
    }

    try {
      await queryRunner.query("TRUNCATE statu CASCADE RESTART IDENTITY");
      console.log("Truncated statu table successfully.");
    } catch (error) {
      console.error("Error truncating statu:", error);
    }

    try {
      await queryRunner.query("TRUNCATE repo CASCADE RESTART IDENTITY");
      console.log("Truncated repo table successfully.");
    } catch (error) {
      console.error("Error truncating repo:", error);
    }

    try {
      await queryRunner.query(
        "TRUNCATE repo_langs_lang CASCADE RESTART IDENTITY"
      );
      console.log("Truncated repo_langs_lang table successfully.");
    } catch (error) {
      console.error("Error truncating repo_langs_lang:", error);
    }

    try {
      await queryRunner.query("TRUNCATE comment CASCADE RESTART IDENTITY");
      console.log("Truncated comment table successfully.");
    } catch (error) {
      console.error("Error truncating comment:", error);
    }

    console.log("Truncate DONE");
    await queryRunner.commitTransaction();

    // Réinsérer les données ici
    const savedlangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new Lang();
        lang.label = el.label;
        return await lang.save();
      })
    );

    console.log("Langs saved:", savedlangs);

    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const statu = new Statu();
        statu.label = el.label;
        return await statu.save();
      })
    );
    console.log("Status saved:", savedStatus);

    const savedRepos = await Promise.all(
      repos.map(async (el) => {
        const repo = new Repo();
        repo.id = el.id;
        repo.name = el.name;
        repo.url = el.url;

        const status = savedStatus.find(
          (st) => st.id === el.isPrivate
        ) as Statu;
        repo.status = status;

        const mylangs = savedlangs.filter((svLg) => {
          const associatedlang = lang_by_repo.filter(
            (lgbyrep) => lgbyrep.repo_id === el.id
          );
          const langLabel = langs.filter((lg) =>
            associatedlang.some((assolg) => assolg.lang_id === lg.id)
          );
          return langLabel.some((lgLabel) => lgLabel.label === svLg.label);
        });
        repo.langs = mylangs;

        return await repo.save();
      })
    );

    await Promise.all(
      comments.map(async (el) => {
        const comment = new Comment();
        comment.comment = el.comment;
        comment.repos_id = el.repos_id;
        return await comment.save();
      })
    );

    console.log("Repos saved:", savedRepos);
    console.info("Seeder is DONE");

    await dataSource.destroy();
    return;
  } catch (error) {
    console.error("Error during seeding:", error);
    await queryRunner.rollbackTransaction();
    await dataSource.destroy();
  }
})();

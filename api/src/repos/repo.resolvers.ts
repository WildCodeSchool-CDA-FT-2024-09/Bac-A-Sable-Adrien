import { Statu } from "../entities/status";
import { Repo, LightRepo } from "../entities/repos";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

/**
 * type Repo {
 *  id: string
 *  ...
 * }
 */
@InputType()
class RepoInput implements Partial<Repo> {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  isPrivate: number;
}

@Resolver(Repo)
export default class RepoResolver {
  // Methode GET pour tous les repos
  @Query(() => [Repo])
  async fullrepos(@Arg("id", { nullable: true }) id?: string) {
    const repos = await Repo.find({
      relations: {
        status: true,
        langs: true,
        comments: true,
      },
    });

    // Si un ID est fourni, filtre les repos
    if (id) {
      return repos.filter((repo) => repo.id === id);
    }
    console.info(repos);
    return repos;
  }

  @Query(() => [LightRepo])
  async lightrepos() {
    const repos = await Repo.find();
    console.info(repos);
    return repos;
  }

  @Mutation(() => Repo)
  async createNewRepo(@Arg("data") newRepo: RepoInput) {
    //const newRepo: RepoInput = req.body.data
    // fonction de validation
    console.info(newRepo);

    const repo = new Repo();
    repo.id = newRepo.id;
    repo.name = newRepo.name;
    repo.url = newRepo.url;

    const status = await Statu.findOneOrFail({
      where: { id: +newRepo.isPrivate },
    });
    repo.status = status;

    await repo.save();
    console.log("repo", repo);
    const myRepo = await Repo.findOneOrFail({
      where: { id: newRepo.id },
      relations: {
        langs: true,
        status: true,
      },
    });
    console.log("myRepo", myRepo);
    return myRepo;
  }
}

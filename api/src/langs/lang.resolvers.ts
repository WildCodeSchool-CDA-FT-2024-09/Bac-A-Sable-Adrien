import { Lang } from "../entities/langs";
import { Query, Resolver } from "type-graphql";
/* Arg, Field, InputType, Mutation, */
@Resolver(Lang)
export default class LangResolver {
  // Methode GET pour tous les Langs
  @Query(() => [Lang])
  async fulllangs() {
    const langs = await Lang.find({});
    console.info(langs);
    return langs;
  }
}

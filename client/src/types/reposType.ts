import { Langs } from "./langsType";

export type Repo = {
  id: string;
  name: string;
  url: string;
  status: string;
  langs: Langs[];
};

import { Langs } from "./langsType";

export type Repo = {
  id: string;
  name: string;
  url: string;
  status: {
    label: string;
    id: number;
  };
  langs: Langs[];
};

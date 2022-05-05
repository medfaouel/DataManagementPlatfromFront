
import {Env} from "./env.model";

import {Teams} from "./teams.model";

export class Criterias{
  crtId: number;
  checkId:number;
  envId: number;
  name:string;

  description:string;
  environment:Env;
  team:Teams;
}

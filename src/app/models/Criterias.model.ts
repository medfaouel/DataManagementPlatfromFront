import {CriteriasServices} from "../services/Criterias.service";
import {Env} from "./env.model";
import {Checks} from "./checks.model";
import {Teams} from "./teams.model";

export class Criterias{
  crtId: number;
  checkId:number;
  envId: number;
  name:string;

  description:string;
  environment:Env;
  check:Checks;
  team:Teams;
}

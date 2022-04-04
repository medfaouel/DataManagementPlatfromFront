import {Teams} from "./teams.model";
import {Criterias} from "./Criterias.model";
import {Checks} from "./checks.model";

export class Env{
  envId: number;
  teamId: number;
  envName:string;
  description:string;
  teams:Teams[];
  criterias:Criterias[];
  checks:Checks[];

}

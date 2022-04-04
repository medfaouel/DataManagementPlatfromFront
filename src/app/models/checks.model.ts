import {CriteriasServices} from "../services/Criterias.service";
import {Env} from "./env.model";

export class Checks{
  checkId: number;
  envId:number;
  comments:string;
  status:string;
  environment:Env;
}

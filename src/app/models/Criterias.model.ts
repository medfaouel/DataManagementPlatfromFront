import {CriteriasServices} from "../services/Criterias.service";
import {Env} from "./env.model";

export class Criterias{
  crtId: number;
  envId: number;
  name:string;
  description:string;
  environment:Env;
}

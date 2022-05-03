import {Env} from "./env.model";
import {workers} from "./workers.model";
import {Criterias} from "./Criterias.model";

export class Teams{
  teamId: number;
  envId: number;
  teamName:string;
  teamDescription:string;
  environment:Env;
  workers:workers[];
  criterias:Criterias[];

}

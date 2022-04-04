import {Env} from "./env.model";
import {workers} from "./workers.model";

export class Teams{
  teamId: number;
  envId: number;
  teamName:string;
  teamDescription:string;
  environment:Env;
  workers:workers[];

}

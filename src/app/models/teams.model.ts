import {Env} from "./env.model";
import {workers} from "./workers.model";
import {Criterias} from "./Criterias.model";
import {User} from "./AppUsers.model";

export class Teams{
  teamId: number;
  envId: number;
  teamName:string;
  teamDescription:string;
  environment:Env;
  criterias:Criterias[];
  users:User[];

}

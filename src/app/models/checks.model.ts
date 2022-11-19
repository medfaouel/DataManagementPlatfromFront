import {CriteriasServices} from "../services/Criterias.service";
import {Env} from "./env.model";
import {Criterias} from "./Criterias.model";
import {Data} from "./Data.model";
import {ChecksDetails} from "./checksDetails.model";
import {Teams} from "./teams.model";

export class Checks{
  checkId: number;
  envId:number;
  crtId:number;

  dataId:number;
  checkAddress:string;
  cdqM_comments:string;
  status:string;
  criterias:Criterias[];
  checkDetails:ChecksDetails[];
  data:Data[];
  team:Teams;
}

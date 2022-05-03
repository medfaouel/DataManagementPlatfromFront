import {CriteriasServices} from "../services/Criterias.service";
import {Env} from "./env.model";
import {Criterias} from "./Criterias.model";
import {Data} from "./Data.model";

export class ChecksDetails{
  checkDetailId:number;
  cdqM_comments:string;
  dqmS_feedback:string;
  cdqM_feedback:string;
  topicOwner_feedback:string;
  status:string;
}

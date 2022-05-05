import {CriteriasServices} from "../services/Criterias.service";
import {Env} from "./env.model";
import {Criterias} from "./Criterias.model";
import {Data} from "./Data.model";
import {Checks} from "./checks.model";

export class ChecksDetails{
  checkDetailId:number;
  checkId:number;
  check: Checks;
  criteria: Criterias;
  cdqM_comments:string;
  dqmS_feedback:string;
  cdqM_feedback:string;
  topicOwner_feedback:string;
  status:string;
}

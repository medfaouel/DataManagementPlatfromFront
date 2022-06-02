import {Criterias} from "./Criterias.model";
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

import { ResponseCode } from "./Enums/ResponseCode.enum";

export class ResponseModel{
  public responseCode:ResponseCode=ResponseCode.NotSet;
  public ResponseMessage:string="";
  public dataSet:any
}

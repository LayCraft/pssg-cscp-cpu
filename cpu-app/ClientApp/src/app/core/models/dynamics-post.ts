import { iDynamicsScheduleG, iDynamicsScheduleGLineItem, iDynamicsOrganization, iDynamicsCrmContact } from "./dynamics-blob";

export interface iDynamicsPostScheduleG {
  UserBCeID: string;
  BusinessBCeID: string;
  ScheduleGCollection: iDynamicsScheduleG[];
  ScheduleGLineItemCollection: iDynamicsScheduleGLineItem[];
}
export interface iDynamicsPostOrg {
  UserBCeID: string;
  BusinessBCeID: string;
  Organization: iDynamicsOrganization;
}
export interface iDynamicsPostUsers {
  UserBCeID: string;
  BusinessBCeID: string;
  StaffCollection: iDynamicsCrmContact[];
}
export interface iDynamicsPostStatusReport {
  BusinessBCeID: string;
  UserBCeID: string;
  ReportingPeriod: number;
  AnswerCollection: iDynamicsAnswer[];
}
export interface iDynamicsAnswer {
  // the text of the question
  vsd_name: string;
  // text description of the question category
  vsd_questioncategory: string;
  vsd_questionorder: number;
  // is this a number boolean or string? Numerically encoded to dynamics.
  vsd_questiontype1: number;
  // answer
  vsd_number?: number;
  vsd_yesnoboolean?: boolean;
  vsd_textanswer?: string;
}

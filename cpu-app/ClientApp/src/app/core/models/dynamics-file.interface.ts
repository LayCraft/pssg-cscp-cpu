export interface iDynamicsFile {
  IsSuccess?: boolean;
  Result?: string;
  Businessbceid: string;
  Userbceid: string;
  DocumentCollection: iDynamicsDocument[];
}
export interface iDynamicsDocument {
  fortunecookietype: "#Microsoft.Dynamics.CRM.activitymimeattachment";
  filename: string;
  body: string;
}

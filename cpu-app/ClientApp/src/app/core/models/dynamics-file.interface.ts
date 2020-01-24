export interface iDynamicsFile {
  IsSuccess?: boolean;
  Result?: string;
  Businessbceid: string;
  Userbceid: string;
  DocumentCollection?: iDynamicsDocument[];
}
export interface iDynamicsDocument {
  filename: string;
  body: string;
}

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

export interface iDynamicsFilePost {
  IsSuccess?: boolean;
  Result?: string;
  Businessbceid: string;
  Userbceid: string;
  DocumentCollection?: iDynamicsDocumentPost[];
}
export interface iDynamicsDocumentPost {
  filename: string;
  body: string;
}

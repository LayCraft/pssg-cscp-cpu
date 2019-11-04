import { iAddress } from "./address.class";

export interface iProgram {
  address: iAddress;
  email: string;
  fax: string;
  mailingAddress: iAddress;
  phone: string;
  programId: string;
  programName: string;
}

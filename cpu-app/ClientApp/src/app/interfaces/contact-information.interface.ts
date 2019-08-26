import { iAddress } from "./address.interface";
import { iPerson } from "./person.interface";

export interface iContactInformation {
  // this interface is very much incomplete.
  organizationName: string;
  contractNumber: string;

  emailAddress: string;
  phoneNumber: string;
  faxNumber: string;
  mainAddress: iAddress;
  mailingAddress: iAddress;

  executiveContact: iPerson;
  boardContact: iPerson;
}

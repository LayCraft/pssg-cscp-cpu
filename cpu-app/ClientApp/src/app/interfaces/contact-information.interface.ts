import { iAddress } from "./address.interface";
import { Person } from "./person.class";

export interface iContactInformation {
  // this interface is very much incomplete.
  organizationName: string;
  contractNumber: string;

  emailAddress: string;
  phoneNumber: string;
  faxNumber: string;
  address: iAddress;
  mailingAddress: iAddress;

  executiveContact: Person;
  boardContact: Person;
}

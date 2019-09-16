import { Address, iAddress } from "./address.class";
import { Person, iPerson } from "./person.class";

export interface iContactInformation {
  organizationName: string;
  contractNumber: string;

  emailAddress: string;
  phoneNumber: string;
  faxNumber: string;
  mainAddress: iAddress;
  mailingAddress: iAddress;

  executiveContact?: iPerson;
  boardContact?: iPerson;
}

export class ContactInformation implements iContactInformation {
  // this class is very much incomplete.
  organizationName: string;
  contractNumber: string;
  emailAddress: string;
  phoneNumber: string;
  faxNumber: string;
  mainAddress: Address;
  mailingAddress: Address;

  executiveContact: Person;
  boardContact: Person;

  constructor(info?: iContactInformation) {
    if (info) {
      this.organizationName = info.organizationName || null;
      this.contractNumber = info.contractNumber || null;
      this.emailAddress = info.emailAddress || null;
      this.phoneNumber = info.phoneNumber || null;
      this.faxNumber = info.faxNumber || null;
      this.mainAddress = new Address(info.mainAddress) || new Address();
      this.mailingAddress = new Address(info.mailingAddress) || new Address();
      this.executiveContact = new Person(info.executiveContact) || new Person();
      this.boardContact = new Person(info.boardContact) || new Person();
    } else {
      this.mainAddress = new Address();
      this.mailingAddress = new Address();
      this.executiveContact = new Person();
      this.boardContact = new Person();
    }
  }
}

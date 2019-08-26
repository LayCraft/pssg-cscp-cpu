import { iContactInformation } from "./contact-information.interface";
import { Address } from "./address.class";
import { Person } from "./person.class";

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
      this.contractNumber = info.organizationName || null;
      this.emailAddress = info.emailAddress || null;
      this.phoneNumber = info.phoneNumber || null;
      this.faxNumber = info.faxNumber || null;
      this.mainAddress = new Address(info.mainAddress) || new Address();
      this.mailingAddress = new Address(info.mailingAddress) || new Address();
      this.executiveContact = new Person(info.executiveContact) || new Person();
      this.boardContact = new Person(info.boardContact) || new Person();
    }
  }
  toDynamics(): object {
    // this isn't real dynamics stuff. Surprise! Just an example of data massaging
    return {
      weirdDynamicsFieldName: 'foobarbazquxfibble',
      weirdDynamicsOrgName: this.organizationName,
      weirdDynamicsContractNumber: this.contractNumber ? this.contractNumber : '10001001',
      // convert to base 64 if an email address exists
      weirdDynamicsEmailFormat: this.emailAddress ? 'curtis@quartech.com' : '',
    }
  }
  fromDynamics(dynamicsObject) {
    // this is a dynamics constructor to move the data back into a useful format
    this.organizationName = dynamicsObject.weirdDynamicsOrgName;
    this.contractNumber = dynamicsObject.weirdDynamicsContractNumber === '10001001' ? null : dynamicsObject.weirdDynamicsContractNumber;
    this.emailAddress = dynamicsObject.weirdDynamicsEmailFormat; // convert from base64 to string
  }
}

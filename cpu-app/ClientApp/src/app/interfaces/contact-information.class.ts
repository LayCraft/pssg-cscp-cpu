import { iContactInformation } from "./contact-information.interface";
import { Address } from "./address.class";

export class ContactInformation implements iContactInformation {
  // this class is very much incomplete.
  organizationName: string;
  contractNumber: string;
  emailAddress: string;
  address: Address;
  constructor(info?: iContactInformation) {
    this.organizationName = info.organizationName;
    this.contractNumber = info.organizationName;
    this.emailAddress = info.emailAddress;
    this.address = new Address(info.address);
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

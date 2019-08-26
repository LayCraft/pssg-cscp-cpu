import { iContactInformation } from "./contact-information.interface";
import { iAddress } from "./address.interface";

export class ContactInformation implements iContactInformation {
  // this class is very much incomplete.
  organizationName: string;
  contractNumber: string;
  emailAddress: string;
  address: iAddress;

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

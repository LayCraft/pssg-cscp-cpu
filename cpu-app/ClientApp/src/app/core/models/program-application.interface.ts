import { iPerson } from "./person.interface";
import { iHours } from './hours.interface';
import { iAddress } from "./address.interface";
import { iContactInformation } from "./contact-information.interface";

export interface iProgramApplication extends iContactInformation {
  contractId: string;
  emailAddress: string;
  faxNumber: string;
  formState: string;
  name: string;
  phoneNumber: string;
  programId: string;
  programLocation: string;
  serviceArea: string;
  hasMailingAddress?: boolean;

  // revenueSources: iRevenueSource[];
  additionalStaff: iPerson[];
  removedStaff: iPerson[];
  mailingAddress: iAddress;
  mainAddress: iAddress;
  operationHours: iHours[];
  programContact: iPerson;
  standbyHours: iHours[];
}

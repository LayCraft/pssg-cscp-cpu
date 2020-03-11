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
  programContact: iPerson;
  numberOfHours: number;
  scheduledHours: number;
  onCallHours: number;
  operationHours: iHours[];
  standbyHours: iHours[];
  perType: number;
}

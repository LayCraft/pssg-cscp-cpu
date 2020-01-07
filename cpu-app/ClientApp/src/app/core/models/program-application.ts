import { iPerson } from "./person.interface";
import { iHours } from './hours.interface';
import { iAddress } from "./address.interface";

export interface iProgramApplication {
  contractId: string;
  email: string;
  faxNumber: string;
  formState: string;
  name: string;
  phoneNumber: string;
  programId: string;
  programLocation: string;
  serviceArea: string;

  // revenueSources: iRevenueSource[];
  additionalStaff: iPerson[];
  mailingAddress: iAddress;
  mainAddress: iAddress;
  operationHours: iHours[];
  programContact: iPerson;
  standbyHours: iHours[];
}

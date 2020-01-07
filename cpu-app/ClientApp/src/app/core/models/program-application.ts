import { Address, iAddress } from "./address.class";
import { Person, iPerson } from "./person.class";
import { iHours, Hours } from './hours.class';

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

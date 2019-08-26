import { iAddress } from "./address.interface";
import { iPerson } from "./person.interface";

export interface iProgramInformation {

  organizationName: string;
  contractNumber: string;
  emailAddress: string;
  programLocation: string;
  serviceArea: string;
  phoneNumber: string;
  faxNumber: string;
  revenueSources: iRevenueSource[];

  mainAddress: iAddress; // should be a class
  mailingAddress: iAddress; // should be a class (for building forms from )
  programContact: iPerson;
  additionalStaff: iPerson[];

  operationHours: iHours[];
  standbyHours: iHours[];
  personnel: iPerson[];
}

export interface iHours {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  open: Date; // just used for the hour representation
  closed: Date;
}

export interface iRevenueSource {
  revenueSourceName: string;
  cash: number;
  inKindContribution: number;
}

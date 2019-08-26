import { iProgramInformation, iHours, iRevenueSource } from "./program-information.interface";
import { iAddress } from "./address.interface";
import { iPerson } from "./person.interface";

export class ProgramInformation implements iProgramInformation {
  organizationName: string;
  contractNumber: string;
  emailAddress: string;
  programLocation: string;
  serviceArea: string;
  phoneNumber: string;
  faxNumber: string;

  mainAddress: Address; // should be a class
  mailingAddress: Address; // should be a class (for building forms from )
  programContact: Person;
  additionalStaff: Person[];
  revenueSources: RevenueSource[];

  operationHours: Hours[];
  standbyHours: Hours[];
  personnel: Person[];
}

export class Address implements iAddress {
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  province: string;
  // country: string;
}
export class Person implements iPerson {
  typeOfEmployee: string; // frontline, regular,
  firstName: string;
  middleName?: string;
  lastName: string;
  title: string;
  email: string;
  phone?: string;
  fax?: string;
  address?: Address;
  baseHourlyWage?: number;
  hoursWorkedPerWeek?: number;
  annualSalary?: number;
  benefits?: number;
  fundedFromVCSP: number;
}
export class Hours implements iHours {
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
export class RevenueSource implements iRevenueSource {
  revenueSourceName: string;
  cash: number;
  inKindContribution: number;
}

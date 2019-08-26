import { iProgramInformation, iHours, iRevenueSource } from "./program-information.interface";
import { iPerson } from "./person.interface";
import { Address } from "./address.class";

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

  constructor(prog?: iProgramInformation) {
    this.organizationName = prog.organizationName;
    this.contractNumber = prog.contractNumber;
    this.emailAddress = prog.emailAddress;
    this.programLocation = prog.programLocation;
    this.serviceArea = prog.serviceArea;
    this.phoneNumber = prog.phoneNumber;
    this.faxNumber = prog.faxNumber;
    this.mainAddress = new Address(prog.mainAddress);
    this.mailingAddress = new Address(prog.mailingAddress);
    this.programContact = new Person(prog.programContact);
    // populate arrays with objects
    prog.additionalStaff.forEach(s => this.additionalStaff.push(new Person(s)));
    prog.revenueSources.forEach(r => this.revenueSources.push(new RevenueSource(r)))
    prog.operationHours.forEach(o => this.operationHours.push(new Hours(o)));
    prog.standbyHours.forEach(s => this.standbyHours.push(new Hours(s)));
    prog.personnel.forEach(p => this.personnel.push(new Person(p)));
  }
  toDynamics(): object {
    return {}
  }
  fromDynamics(dynamicsObject) {
  }
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
  constructor(person: iPerson) {
    this.typeOfEmployee = person.typeOfEmployee; // frontline, regular,
    this.firstName = person.firstName;
    this.middleName = person.middleName;
    this.lastName = person.lastName;
    this.title = person.title;
    this.email = person.email;
    this.phone = person.phone;
    this.fax = person.fax;
    this.address = new Address(person.address);
    this.baseHourlyWage = person.baseHourlyWage;
    this.hoursWorkedPerWeek = person.hoursWorkedPerWeek;
    this.annualSalary = person.annualSalary;
    this.benefits = person.benefits;
    this.fundedFromVCSP = person.fundedFromVCSP;
  }
  toDynamics(): object {
    return {}
  }
  fromDynamics(dynamicsObject) {
  }
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
  constructor(hours?: iHours) {
    this.monday = hours.monday;
    this.tuesday = hours.tuesday;
    this.wednesday = hours.wednesday;
    this.thursday = hours.thursday;
    this.friday = hours.friday;
    this.saturday = hours.saturday;
    this.sunday = hours.sunday;
    this.open = new Date(hours.open);
    this.closed = new Date(hours.closed);
  }
  toDynamics(): object {
    return {}
  }
  fromDynamics(dynamicsObject) {
  }
}
export class RevenueSource implements iRevenueSource {
  revenueSourceName: string;
  cash: number;
  inKindContribution: number;
  constructor(rs?: iRevenueSource) {
    this.revenueSourceName = rs.revenueSourceName;
    this.cash = rs.cash;
    this.inKindContribution = rs.inKindContribution;
  }
  toDynamics(): object {
    return {}
  }
  fromDynamics(dynamicsObject) {
  }
}

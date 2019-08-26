import { Address } from "./address.class";
import { iProgramInformation, iHours, iRevenueSource } from "./program-information.interface";
import { Person } from "./person.class";

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
    if (prog) {
      this.organizationName = prog.organizationName || null;
      this.contractNumber = prog.contractNumber || null;
      this.emailAddress = prog.emailAddress || null;
      this.programLocation = prog.programLocation || null;
      this.serviceArea = prog.serviceArea || null;
      this.phoneNumber = prog.phoneNumber || null;
      this.faxNumber = prog.faxNumber || null;
      this.mainAddress = new Address(prog.mainAddress) || new Address();
      this.mailingAddress = new Address(prog.mailingAddress) || new Address();
      this.programContact = new Person(prog.programContact) || new Person();
      // populate arrays if they are included
      prog.additionalStaff ? prog.additionalStaff.forEach(s => this.additionalStaff.push(new Person(s))) : this.additionalStaff = [];
      prog.revenueSources ? prog.revenueSources.forEach(r => this.revenueSources.push(new RevenueSource(r))) : this.revenueSources = [];
      prog.operationHours ? prog.operationHours.forEach(o => this.operationHours.push(new Hours(o))) : this.operationHours = [];
      prog.standbyHours ? prog.standbyHours.forEach(s => this.standbyHours.push(new Hours(s))) : this.standbyHours = [];
      prog.personnel ? prog.personnel.forEach(p => this.personnel.push(new Person(p))) : this.personnel = [];
    }
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
    if (hours) {
      this.monday = hours.monday || null;
      this.tuesday = hours.tuesday || null;
      this.wednesday = hours.wednesday || null;
      this.thursday = hours.thursday || null;
      this.friday = hours.friday || null;
      this.saturday = hours.saturday || null;
      this.sunday = hours.sunday || null;
      this.open = new Date(hours.open) || null;
      this.closed = new Date(hours.closed) || null;
    }
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
    if (rs) {
      this.revenueSourceName = rs.revenueSourceName || null;
      this.cash = rs.cash || null;
      this.inKindContribution = rs.inKindContribution || null;
    }
  }
  toDynamics(): object {
    return {}
  }
  fromDynamics(dynamicsObject) {
  }
}

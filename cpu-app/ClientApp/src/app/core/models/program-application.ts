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

export class ProgramApplication implements iProgramApplication {
  contractId: string;
  programId: string;
  name: string;
  formState: string;
  email: string;
  programLocation: string;
  serviceArea: string;
  phoneNumber: string;
  faxNumber: string;

  mainAddress: iAddress; // should be a class
  mailingAddress: iAddress; // should be a class (for building forms from )
  programContact: iPerson;

  // revenueSources: iRevenueSource[] = [];
  additionalStaff: iPerson[] = [];
  operationHours: iHours[] = [];
  standbyHours: iHours[] = [];

  constructor(prog?: iProgramApplication) {
    if (prog) {
      this.name = prog.name || null;
      this.formState = prog.formState || null;
      this.programId = prog.programId || null;
      this.contractId = prog.contractId || null;
      this.programLocation = prog.programLocation || null;
      this.serviceArea = prog.serviceArea || null;
      this.phoneNumber = prog.phoneNumber || null;
      this.faxNumber = prog.faxNumber || null;
      this.mainAddress = new Address(prog.mainAddress) || new Address();
      this.mailingAddress = new Address(prog.mailingAddress) || new Address();
      this.programContact = new Person(prog.programContact) || new Person();
      // populate arrays if they are included
      prog.additionalStaff ? prog.additionalStaff.forEach(s => this.additionalStaff.push(new Person(s))) : this.additionalStaff = [];
      // prog.revenueSources ? prog.revenueSources.forEach(r => this.revenueSources.push(new RevenueSource(r))) : this.revenueSources = [];
      prog.operationHours ? prog.operationHours.forEach(o => this.operationHours.push(new Hours(o))) : this.operationHours = [];
      prog.standbyHours ? prog.standbyHours.forEach(s => this.standbyHours.push(new Hours(s))) : this.standbyHours = [];
      prog.additionalStaff ? prog.additionalStaff.forEach(p => this.additionalStaff.push(new Person(p))) : this.additionalStaff = [];
    } else {
      this.mainAddress = new Address();
      this.mailingAddress = new Address();
      this.programContact = new Person();
    }
  }
}

import { iPerson, Person } from "./person.class";
import { DynamicsBlob } from "./dynamics-blob";

export interface iTombstone {
  formName: string;
  formType: string; // Differentiates which component we use to set the data
  formDeadline: Date; // Latest time this can be submitted
  formStatus: string; // "Not Started", "Awaiting Approval", "Submitted", "Late", "Missed"
  forDateRangeStart: Date; // start of applicable period for form
  forDateRangeEnd: Date; // end of applicable period for form
  internalNote: string; // for internal note
  note: string; // for communication notes or automatically generated notes.
  contractNumber: string; // This item appears on which contract number
  organizationId: string; // BCeID number for lookup
  programId: string; // the id of the program to look up
  frequency: string; // annual, biannual, quarter, month,
  lastUpdated: Date;
}
export class Tombstone implements iTombstone {
  // this class may be useful because it can offer a way to convert dates.
  formName: string;
  formType: string;
  formDeadline: Date;
  formStatus: string;
  forDateRangeStart: Date;
  forDateRangeEnd: Date;
  note: string;
  contractNumber: string;
  organizationId: string;
  programId: string;
  frequency: string;
  internalNote: string;
  lastUpdated: Date;
  constructor(tombstone: iTombstone) {
    if (tombstone) {
      this.formName = tombstone.formName || null;
      this.formType = tombstone.formType || null;
      this.formDeadline = tombstone.formDeadline || null;
      this.formStatus = tombstone.formStatus || null;
      this.forDateRangeStart = tombstone.forDateRangeStart || null;
      this.forDateRangeEnd = tombstone.forDateRangeEnd || null;
      this.note = tombstone.note || null;
      this.contractNumber = tombstone.contractNumber || null;
      this.organizationId = tombstone.organizationId || null;
      this.frequency = tombstone.frequency || null;
      this.lastUpdated = tombstone.lastUpdated || null;
      this.internalNote = tombstone.internalNote || null;
      this.programId = tombstone.programId || null;
    }
  }
  toDynamics() { }
  fromDynamics(dynamics: DynamicsBlob) { }
}

export interface iProgramTombstone {
  programContact: iPerson;
  programName: string;
  programId: string;
  contractNumber: string;
  organizationId: string;
}
export class ProgramTombstone implements iProgramTombstone {
  programContact: iPerson;
  programName: string;
  programId: string;
  contractNumber: string;
  organizationId: string;
  constructor(tombstone?: iProgramTombstone) {
    if (tombstone) {
      this.programContact = new Person(tombstone.programContact) || null;
      this.programName = tombstone.programName || null;
      this.programId = tombstone.programId || null;
      this.contractNumber = tombstone.contractNumber || null;
      this.organizationId = tombstone.organizationId || null;
    } else {
      this.programContact = new Person();
    }
  }
  toDynamics() { }
  fromDynamics(dynamics: DynamicsBlob) {
    this.programContact = new Person(dynamics['programContact']) || null;
    this.programName = dynamics['programName'] || null;
    this.programId = dynamics['programName'] || null;
    this.contractNumber = dynamics['contractNumber'] || null;
    this.organizationId = dynamics['organizationId'] || null;
  }
}

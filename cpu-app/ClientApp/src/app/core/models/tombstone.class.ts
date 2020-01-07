import { Person } from "./person.class";
import { iPerson } from "./person.interface";
import { iTombstone, iProgramTombstone } from "./tombstone.interface";

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
  contractId: string;
  programId: string;
  frequency: string;
  internalNote: string;
  lastUpdated: Date;
  programName: string;
  programContact: Person;
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
      this.contractId = tombstone.contractId || null;
      this.frequency = tombstone.frequency || null;
      this.lastUpdated = tombstone.lastUpdated || null;
      this.internalNote = tombstone.internalNote || null;
      this.programId = tombstone.programId || null;
      this.programName = tombstone.programName || null;
      this.programContact = new Person(tombstone.programContact);
    }
  }
}

export class ProgramTombstone implements iProgramTombstone {
  programContact: iPerson;
  programName: string;
  programId: string;
  contractId: string;
  contractNumber: string;
  organizationId: string;
  constructor(tombstone?: iProgramTombstone) {
    if (tombstone) {
      this.programContact = new Person(tombstone.programContact) || null;
      this.programName = tombstone.programName || null;
      this.programId = tombstone.programId || null;
      this.contractId = tombstone.contractId || null;
      this.contractNumber = tombstone.contractNumber || null;
      this.organizationId = tombstone.organizationId || null;
    } else {
      this.programContact = new Person();
    }
  }
}

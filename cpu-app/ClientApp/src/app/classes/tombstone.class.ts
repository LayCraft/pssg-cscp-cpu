export interface iTombstone {
  formName: string;
  formType: string; // Differentiates which component we use to set the data
  formDeadline: Date; // Latest time this can be submitted
  formStatus: string; // "Not Started", "Awaiting Approval", "Submitted", "Late", "Missed"
  forDateRangeStart: Date; // start of applicable period for form
  forDateRangeEnd: Date; // end of applicable period for form
  note: string; // for communication notes or automatically generated notes.
  contractNumber: string; // This item appears on which contract number
  organizationId: string; // BCeID number for lookup
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
    }
  }
}

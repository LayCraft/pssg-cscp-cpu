// a collection of the expense item guids as K/V pairs for generating line items
export class TransmogrifierStatusReport {
  public organizationId: string;
  public userId: string;
  public statusReport: any;

  constructor(g: any) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.statusReport = this.buildStatusReport(g);
  }
  buildStatusReport(g: any): any {
    // for every item in the schedule g's
    return null;
  }
}

import { iDynamicsBudgetProposal } from "./dynamics-blob";

export class TransmogrifierBudgetProposal {
  public organizationId: string;
  public userId: string;
  public expenseReport: any;

  constructor(g: iDynamicsBudgetProposal) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
  }
}

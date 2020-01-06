import { iDynamicsBudgetProposal } from "./dynamics-blob";
import { iProgramBudget } from "./budget-proposal.class";

export class TransmogrifierBudgetProposal {
  public organizationId: string;
  public userId: string;
  public programBudget: iProgramBudget;

  constructor(g: iDynamicsBudgetProposal) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.programBudget = this.buildBudgetProposal(g);
  }
  buildBudgetProposal(g: iDynamicsBudgetProposal): iProgramBudget {
    const pb: iProgramBudget = {
      contractId: '',
      programId: '',
      name: '',
      type: '',
      email: '',
      revenueSources: [],
      salariesAndBenefits: [],
      programDeliveryCosts: [],
      programDeliveryMemberships: [],
      programDeliveryOtherExpenses: [],
      administrationCosts: [],
      administrationOtherExpenses: [],
    };

    pb.revenueSources = [];
    pb.salariesAndBenefits = [];
    pb.programDeliveryCosts = [];
    pb.programDeliveryMemberships = [];
    pb.programDeliveryOtherExpenses = [];
    pb.administrationCosts = [];
    pb.administrationOtherExpenses = [];

    return pb;
  }
}

import { iDynamicsBudgetProposal, iDynamicsCrmProgramRevenueSource } from "./dynamics-blob";
import { iProgramBudget } from "./budget-proposal.class";
import { iRevenueSource } from "./revenue-source.class";

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
      contractId: g.Contract.vsd_contractid || '',
      programId: g.Program.vsd_programid || '',
      name: g.Program.vsd_name || '',
      email: g.Program.vsd_emailaddress || '',
      revenueSources: [],
      salariesAndBenefits: [],
      programDeliveryCosts: [],
      programDeliveryMemberships: [],
      programDeliveryOtherExpenses: [],
      administrationCosts: [],
      administrationOtherExpenses: [],
    };

    pb.revenueSources = this.buildRevenueSources(g);
    pb.salariesAndBenefits = [];
    pb.programDeliveryCosts = [];
    pb.programDeliveryMemberships = [];
    pb.programDeliveryOtherExpenses = [];
    pb.administrationCosts = [];
    pb.administrationOtherExpenses = [];

    return pb;
  }
  buildRevenueSources(g: iDynamicsBudgetProposal): iRevenueSource[] {
    const rs: iRevenueSource[] = [];
    // for each revenue source in the collection
    g.ProgramRevenueSourceCollection.forEach((rs: iDynamicsCrmProgramRevenueSource) => {

    })
    return rs;
  }
}

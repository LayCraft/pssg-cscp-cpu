import { iDynamicsBudgetProposal, iDynamicsCrmProgramRevenueSource, iDynamicsProgramExpense } from "./dynamics-blob";
import { iProgramBudget, iSalaryAndBenefits } from "./budget-proposal.class";
import { iRevenueSource } from "./revenue-source.class";
import { revenueSourceTypes, revenueSourceType } from "../constants/revenue-source-type";
import { iPerson } from "./person.class";

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
    pb.salariesAndBenefits = this.buildSalariesAndBenefits(g);
    pb.programDeliveryCosts = [];
    pb.programDeliveryMemberships = [];
    pb.programDeliveryOtherExpenses = [];
    pb.administrationCosts = [];
    pb.administrationOtherExpenses = [];

    return pb;
  }
  buildRevenueSources(g: iDynamicsBudgetProposal): iRevenueSource[] {
    const rs: iRevenueSource[] = [];
    // for each revenue source in the collection build it into something useful
    g.ProgramRevenueSourceCollection.forEach((prs: iDynamicsCrmProgramRevenueSource) => {
      rs.push({
        revenueSourceName: revenueSourceType(prs.vsd_cpu_revenuesourcetype) || '',
        cash: prs.vsd_cashcontribution || 0,
        inKindContribution: prs.vsd_inkindcontribution || 0,
        other: prs.vsd_cpu_otherrevenuesource || '',
      });
    })
    return rs;
  }
  buildSalariesAndBenefits(g: iDynamicsBudgetProposal): iSalaryAndBenefits[] {
    return g.ProgramExpenseCollection
      // filter all non "salaries and benefits" items
      .filter((e: iDynamicsProgramExpense) => e.vsd_cpu_programexpensetype === 100000000)
      // data munging
      .map((e: iDynamicsProgramExpense): iSalaryAndBenefits => {
        return {
          title: e.vsd_cpu_titleposition || '',
          salary: e.vsd_cpu_salary || 0,
          benefits: e.vsd_cpu_benefits || 0,
          fundedFromVscp: e.vsd_cpu_fundedfromvscp || 0,
          totalCost: e.vsd_totalcost || 0,
        }
      });
  }
}

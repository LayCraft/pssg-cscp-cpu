import { iDynamicsBudgetProposal, iDynamicsCrmProgramRevenueSource, iDynamicsProgramExpense, iDynamicsEligibleExpenseItem } from "./dynamics-blob";
import { iRevenueSource } from "./revenue-source.interface";
import { revenueSourceType } from "../constants/revenue-source-type";
import { iProgramBudget } from "./program-budget.interface";
import { iSalaryAndBenefits } from "./salary-and-benefits.interface";
import { iExpenseItem } from "./expense-item.interface";
import { uuidv4 } from "../constants/uuidv4";

export class TransmogrifierBudgetProposal {
  public organizationId: string;
  public userId: string;
  public contractId: string;
  public revenueSources: iRevenueSource[];
  //revenue sources
  //program budget collection

  public programBudget: iProgramBudget;

  constructor(g: iDynamicsBudgetProposal) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.revenueSources = this.buildRevenueSources(g);
    // this.programBudget = this.buildBudgetProposal(g);
    this.contractId = g.Contract.vsd_contractid;
  }
  // private buildBudgetProposal(g: iDynamicsBudgetProposal): iProgramBudget {
  //   return {
  //     contractId: g.Contract.vsd_contractid || '',
  //     programId: g.Program.vsd_programid || '',
  //     name: g.Program.vsd_name || '',
  //     email: g.Program.vsd_emailaddress || '',
  //     revenueSources: this.buildRevenueSources(g),
  //     salariesAndBenefits: this.buildSalariesAndBenefits(g),
  //     programDeliveryCosts: this.buildProgramDeliveryCosts(g),
  //     programDeliveryMemberships: this.buildProgramDeliveryMemberships(g),
  //     programDeliveryOtherExpenses: this.buildProgramDeliveryOtherExpenses(g),
  //     administrationCosts: this.buildAdministrationCosts(g),
  //     administrationOtherExpenses: this.buildAdministrationOtherExpenses(g),
  //   };
  // }
  private buildRevenueSources(g: iDynamicsBudgetProposal): iRevenueSource[] {
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
  // private buildSalariesAndBenefits(g: iDynamicsBudgetProposal): iSalaryAndBenefits[] {
  //   return g.ProgramExpenseCollection
  //     // filter all non "salaries and benefits" items
  //     .filter((e: iDynamicsProgramExpense) => e.vsd_cpu_programexpensetype === 100000000)
  //     // data munging
  //     .map((e: iDynamicsProgramExpense): iSalaryAndBenefits => {
  //       return {
  //         title: e.vsd_cpu_titleposition || '',
  //         salary: e.vsd_cpu_salary || 0,
  //         benefits: e.vsd_cpu_benefits || 0,
  //         fundedFromVscp: e.vsd_cpu_fundedfromvscp || 0,
  //         totalCost: e.vsd_totalcost || 0,
  //         uuid: e.vsd_programexpenseid || uuidv4(),
  //       }
  //     });
  // }
  // private buildProgramDeliveryCosts(g: iDynamicsBudgetProposal): iExpenseItem[] {
  //   const dict = g.EligibleExpenseItemCollection.filter(e => e.vsd_programexpensetype !== 100000000)
  //     .map((s: iDynamicsEligibleExpenseItem) => {
  //       if (s.vsd_eligibleexpenseitemid && s.vsd_name) {
  //         // make an object to hold the kv pair
  //         const tmp = {};
  //         // assign the name to a property with matching guid
  //         tmp[s.vsd_eligibleexpenseitemid] = s.vsd_name;
  //         return tmp;
  //       }
  //     }).reduce((prev, curr) => {
  //       // put them together
  //       return { ...curr, ...prev }
  //     });
  //   // collector for program expenses
  //   const c: iExpenseItem[] = [];
  //   g.ProgramExpenseCollection.forEach((pe: iDynamicsProgramExpense) => {
  //     c.push({
  //       uuid: pe.vsd_programexpenseid || uuidv4(),
  //       itemName: dict[pe._vsd_eligibleexpenseitemid_value],
  //       fundedFromVscp: pe.vsd_cpu_fundedfromvscp || 0,
  //       cost: pe.vsd_totalcost,
  //       tooltip: null,
  //     });
  //   });
  //   return c;
  // }
  // private buildProgramDeliveryMemberships(g: iDynamicsBudgetProposal): iExpenseItem[] {
  //   return [];
  // }
  // private buildProgramDeliveryOtherExpenses(g: iDynamicsBudgetProposal): iExpenseItem[] {
  //   return [];
  // }
  // private buildAdministrationCosts(g: iDynamicsBudgetProposal): iExpenseItem[] {
  //   return [];
  // }
  // private buildAdministrationOtherExpenses(g: iDynamicsBudgetProposal): iExpenseItem[] {
  //   return [];
  // }
}

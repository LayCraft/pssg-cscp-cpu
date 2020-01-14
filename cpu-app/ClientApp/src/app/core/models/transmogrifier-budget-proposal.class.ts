import { iDynamicsBudgetProposal, iDynamicsCrmProgramRevenueSource, iDynamicsProgramExpense, iDynamicsEligibleExpenseItem, iDynamicsCrmProgram, iDynamicsCrmProgramBudget } from "./dynamics-blob";
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
  public programBudgets: iProgramBudget[];

  constructor(g: iDynamicsBudgetProposal) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.programBudgets = this.buildBudgetProposals(g);
    this.contractId = g.Contract.vsd_contractid;
  }
  private buildBudgetProposals(g: iDynamicsBudgetProposal): iProgramBudget[] {
    return g.ProgramCollection.map((d: iDynamicsCrmProgramBudget): iProgramBudget => {
      return {
        contractId: g.Contract.vsd_contractid || '',
        programId: d.vsd_programid || '',
        name: d.vsd_name || '',
        email: d.vsd_emailaddress || '',
        revenueSources: this.buildRevenueSources(g, d.vsd_programid),
        salariesAndBenefits: this.buildSalariesAndBenefits(g, d.vsd_programid),
        programDeliveryCosts: [],
        programDeliveryMemberships: [],
        programDeliveryOtherExpenses: [],
        administrationCosts: [],
        administrationOtherExpenses: [],
      };
    })
  }
  private buildRevenueSources(g: iDynamicsBudgetProposal, programId: string): iRevenueSource[] {
    // only program id matching revenue sources returned
    const rs: iRevenueSource[] = [];
    // for each revenue source in the collection build it into something useful
    g.ProgramRevenueSourceCollection
      .filter((prs: iDynamicsCrmProgramRevenueSource) => prs._vsd_programid_value === programId)
      .forEach((prs: iDynamicsCrmProgramRevenueSource) => {
        rs.push({
          revenueSourceName: revenueSourceType(prs.vsd_cpu_revenuesourcetype) || '',
          cash: prs.vsd_cashcontribution || 0,
          inKindContribution: prs.vsd_inkindcontribution || 0,
          other: prs.vsd_cpu_otherrevenuesource || '',
        });
      })
    return rs;
  }
  private buildSalariesAndBenefits(g: iDynamicsBudgetProposal, programId: string): iSalaryAndBenefits[] {
    return g.SalaryAndBenefitCollection
      // filter all non "salaries and benefits" items
      .filter((e: iDynamicsProgramExpense) => e._vsd_programid_value === programId)
      // data munging
      .map((e: iDynamicsProgramExpense): iSalaryAndBenefits => {
        return {
          title: e.vsd_cpu_titleposition || '',
          salary: e.vsd_cpu_salary || 0,
          benefits: e.vsd_cpu_benefits || 0,
          fundedFromVscp: e.vsd_cpu_fundedfromvscp || 0,
          totalCost: e.vsd_totalcost || 0,
          uuid: e.vsd_programexpenseid || uuidv4(),
        }
      });
  }
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
  private buildProgramDeliveryMemberships(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  private buildProgramDeliveryOtherExpenses(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  private buildAdministrationCosts(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  private buildAdministrationOtherExpenses(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
}

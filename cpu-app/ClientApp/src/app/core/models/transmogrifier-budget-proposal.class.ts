import { iDynamicsBudgetProposal, iDynamicsCrmProgramRevenueSource, iDynamicsProgramExpense, iDynamicsEligibleExpenseItem, iDynamicsCrmProgramBudget, iDynamicsProgramType } from "./dynamics-blob";
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
  private dict: object;
  constructor(g: iDynamicsBudgetProposal) {
    // make private dict for looking up guids
    this.dict = this.buildDict(g);
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.contractId = g.Contract.vsd_contractid; // the contract's id
    this.programBudgets = this.buildBudgetProposals(g);
  }
  private buildDict(g: iDynamicsBudgetProposal): object {
    // Note: This only works if all guids in dynamics are unique.
    // create a lookup dictionary. It makes an object where a guid is the property and holds a human readable name as the value.
    // e.g. {qw87e6radsa:"Human name", ew491278938:"Useful description"}
    const dict = g.EligibleExpenseItemCollection
      .map((s: iDynamicsEligibleExpenseItem): object => {
        if (s.vsd_eligibleexpenseitemid && s.vsd_name) {
          // make an object to hold the kv pair
          const tmp = {};
          // assign the name to a property with matching guid
          tmp[s.vsd_eligibleexpenseitemid] = s.vsd_name;
          return tmp;
        }
      }).reduce((prev, curr) => {
        // put the objects together into one mega lookup object
        return { ...curr, ...prev }
      });
    // add all of the program type properties to the dict as well
    g.ProgramTypeCollection
      .forEach((p: iDynamicsProgramType) => {
        dict[p.vsd_programtypeid] = p.vsd_name;
      });

    return dict;
  }
  private buildBudgetProposals(g: iDynamicsBudgetProposal): iProgramBudget[] {
    return g.ProgramCollection.map((d: iDynamicsCrmProgramBudget): iProgramBudget => {
      return {
        contractId: g.Contract.vsd_contractid || '',
        programId: d.vsd_programid || '',
        name: d.vsd_name || '',
        type: this.dict[d._vsd_programtype_value] || 'Program type not set.',
        email: d.vsd_emailaddress || '',
        administrationCosts: this.expenseItems(g.AdministrationCostCollection, d.vsd_programid),
        administrationOtherExpenses: this.expenseItems(g.AdministrationCostCollection, d.vsd_programid, true),
        programDeliveryCosts: this.expenseItems(g.ProgramDeliveryCostCollection, d.vsd_programid),
        programDeliveryOtherExpenses: this.expenseItems(g.ProgramDeliveryCostCollection, d.vsd_programid, true),
        revenueSources: this.buildRevenueSources(g, d.vsd_programid),
        salariesAndBenefits: this.buildSalariesAndBenefits(g, d.vsd_programid),
        contactLookupId: d._vsd_contactlookup_value || null
      };
    })
  }
  private buildRevenueSources(g: iDynamicsBudgetProposal, programId: string): iRevenueSource[] {
    // for each revenue source in the collection build it into something useful
    return g.ProgramRevenueSourceCollection
      // get rid of all other programs
      .filter((prs: iDynamicsCrmProgramRevenueSource) => prs._vsd_programid_value === programId)
      .map((prs: iDynamicsCrmProgramRevenueSource): iRevenueSource => {
        return {
          revenueSourceName: revenueSourceType(prs.vsd_cpu_revenuesourcetype) || '',
          cash: prs.vsd_cashcontribution || 0,
          inKindContribution: prs.vsd_inkindcontribution || 0,
          other: prs.vsd_cpu_otherrevenuesource || '',
        };
      })
  }
  private buildSalariesAndBenefits(g: iDynamicsBudgetProposal, programId: string): iSalaryAndBenefits[] {
    return g.SalaryAndBenefitCollection
      // get rid of all other programs
      .filter((e: iDynamicsProgramExpense) => e._vsd_programid_value === programId)
      .map((e: iDynamicsProgramExpense): iSalaryAndBenefits => {
        // data munging
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
  private expenseItems(items: iDynamicsProgramExpense[], programId: string, other = false): iExpenseItem[] {
    // by turning on the other variable we return only the "other" category of items from the list
    // we determine what is considered other by checking if a property exists for "vsd_cpu_otherexpense"
    return items
      // get rid of all other programs
      .filter((pdc: iDynamicsProgramExpense) => pdc._vsd_programid_value === programId)
      // if we want to return the "other expenses" we check for the existence of the other expense property and if it exists we return true otherwise we pick the values that are missing the "other expense" property
      .filter((pdc: iDynamicsProgramExpense) => other ? !!pdc.vsd_cpu_otherexpense : !pdc.vsd_cpu_otherexpense)
      .map((pe: iDynamicsProgramExpense): iExpenseItem => {
        return {
          uuid: pe.vsd_programexpenseid || uuidv4(),
          // if we are returning only the other expenses we use the other expense field as the name
          itemName: other ? pe.vsd_cpu_otherexpense : this.dict[pe._vsd_eligibleexpenseitemid_value] || 'Name error!',
          fundedFromVscp: pe.vsd_cpu_fundedfromvscp || 0,
          cost: pe.vsd_totalcost,
        }
      });
  }
}

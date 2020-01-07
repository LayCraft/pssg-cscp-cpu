import { iDynamicsBudgetProposal, iDynamicsCrmProgramRevenueSource, iDynamicsProgramExpense } from "./dynamics-blob";
import { iProgramBudget, iSalaryAndBenefits, iExpenseItem } from "./budget-proposal.class";
import { iRevenueSource } from "./revenue-source.class";
import { revenueSourceType } from "../constants/revenue-source-type";

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
    return {
      contractId: g.Contract.vsd_contractid || '',
      programId: g.Program.vsd_programid || '',
      name: g.Program.vsd_name || '',
      email: g.Program.vsd_emailaddress || '',
      revenueSources: this.buildRevenueSources(g),
      salariesAndBenefits: this.buildSalariesAndBenefits(g),
      programDeliveryCosts: this.buildProgramDeliveryCosts(g),
      programDeliveryMemberships: this.buildProgramDeliveryMemberships(g),
      programDeliveryOtherExpenses: this.buildProgramDeliveryOtherExpenses(g),
      administrationCosts: this.buildAdministrationCosts(g),
      administrationOtherExpenses: this.buildAdministrationOtherExpenses(g),
    };
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
  buildProgramDeliveryCosts(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];

  }
  buildProgramDeliveryMemberships(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  buildProgramDeliveryOtherExpenses(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  buildAdministrationCosts(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  buildAdministrationOtherExpenses(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
}

const budgetProposalLabels = {
  '05D84E55-2EBA-E911-B80F-00505683FBF4': 'Administration - Related Utilities',
  'B87E6400-2EBA-E911-B80F-00505683FBF4': 'Administration-Related Rent/Lease/Mortgage',
  '4B7325D9-2DBA-E911-B80F-00505683FBF4': 'Administrative Support Wages/Benefits',
  '53C1C560-2EBA-E911-B80F-00505683FBF4': 'Bookkeeping/Bank Fees',
  'BD4ABCC6-2DBA-E911-B80F-00505683FBF4': 'Management Salary/Benefits',
  '099C3B77-2DBA-E911-B80F-00505683FBF4': 'Memberships',
  '7D48816D-2EBA-E911-B80F-00505683FBF4': 'Other Administration Costs',
  'A5FE2187-2DBA-E911-B80F-00505683FBF4': 'Other Program Related Expenses',
  'F070E090-2CBA-E911-B80F-00505683FBF4': 'Phone',
  'B33CDA77-2CBA-E911-B80F-00505683FBF4': 'Program Related - Office Supplies/Software',
  '18F4336E-2CBA-E911-B80F-00505683FBF4': 'Program Related - Rent/Lease/Mortgage',
  'F7E71080-2CBA-E911-B80F-00505683FBF4': 'Program Related - Travel',
  '32AD5D8A-2CBA-E911-B80F-00505683FBF4': 'Program Related - Utilities',
  '121ED353-2DBA-E911-B80F-00505683FBF4': 'Property Maintenance',
  '4DD7B12C-2DBA-E911-B80F-00505683FBF4': 'Resource Materials/Printing Costs',
  'B4CD7AA0-2CBA-E911-B80F-00505683FBF4': 'Staff Training and Associated Travel',
  '84415B3D-2DBA-E911-B80F-00505683FBF4': 'Volunteer Appreciation/Honorariums',
  '3974f01e-fa12-ea11-b814-00505683fbf4': 'Salaries and Benefits',
}

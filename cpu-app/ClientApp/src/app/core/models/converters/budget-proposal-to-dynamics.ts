import { iDynamicsBudgetProposalPost, iDynamicsProgramRevenueSource, iDynamicsProgramExpense } from "../dynamics-post";
import { TransmogrifierBudgetProposal } from "../transmogrifier-budget-proposal.class";
import { iProgramBudget } from "../program-budget.interface";
import { iExpenseItem } from "../expense-item.interface";
import { iSalaryAndBenefits } from "../salary-and-benefits.interface";
import { iRevenueSource } from "../revenue-source.interface";
import { revenueSourceValue } from "../../constants/revenue-source-type";

const expenseType = {
  // vsd_cpu_programexpensetype converter
  salaries_and_benefits: 100000000,
  program_delivery: 100000001,
  administrative: 100000002
};
export function convertBudgetProposalToDynamics(trans: TransmogrifierBudgetProposal): iDynamicsBudgetProposalPost {
  // when we need the matching guid we can look it up from the text. this flips the dict's property and value. Which is fine because it is a string.
  const reverseDict = {};
  for (let property in trans.dict) {
    if (trans.dict.hasOwnProperty(property)) {
      reverseDict[trans.dict[property]] = property;
    }
  }
  const p: iDynamicsBudgetProposalPost = {
    BusinessBCeID: trans.organizationId,
    UserBCeID: trans.userId,
    ProgramExpenseCollection: [],
    ProgramRevenueSourceCollection: [],
  }
  trans.programBudgets.forEach((pb: iProgramBudget) => {
    // ADMINISTRATIVE costs the 100000002's as defined in the excel sheet
    pb.administrationCosts.map((e: iExpenseItem): iDynamicsProgramExpense => {
      return {
        vsd_cpu_programexpensetype: expenseType.administrative,
        vsd_inputamount: e.cost || 0,
        vsd_EligibleExpenseItemIdfortunecookiebind: pb.programId,
        vsd_cpu_fundedfromvscp: e.fundedFromVscp || 0,
        vsd_ProgramIdfortunecookiebind: e.uuid,
      }
    })
      .forEach((x: iDynamicsProgramExpense) => { p.ProgramExpenseCollection.push(x) });
    pb.administrationOtherExpenses.map((e: iExpenseItem): iDynamicsProgramExpense => {
      return {
        vsd_cpu_programexpensetype: expenseType.administrative,
        vsd_inputamount: e.cost || 0,
        vsd_EligibleExpenseItemIdfortunecookiebind: pb.programId,
        vsd_cpu_fundedfromvscp: e.fundedFromVscp || 0,
        vsd_ProgramIdfortunecookiebind: e.uuid
      }
    })
      .forEach((x: iDynamicsProgramExpense) => { p.ProgramExpenseCollection.push(x) });

    // PROGRAM DELIVERY costs the 100000001's as defined in the excel sheet
    pb.programDeliveryCosts.map((e: iExpenseItem): iDynamicsProgramExpense => {
      return {
        vsd_cpu_programexpensetype: expenseType.program_delivery,
        vsd_inputamount: e.cost || 0,
        vsd_EligibleExpenseItemIdfortunecookiebind: pb.programId,
        vsd_cpu_fundedfromvscp: e.fundedFromVscp || 0,
        vsd_ProgramIdfortunecookiebind: e.uuid
      }
    }).forEach((x: iDynamicsProgramExpense) => { p.ProgramExpenseCollection.push(x) });
    pb.programDeliveryOtherExpenses.map((e: iExpenseItem): iDynamicsProgramExpense => {
      return {
        vsd_cpu_programexpensetype: expenseType.program_delivery,
        vsd_inputamount: e.cost || 0,
        vsd_EligibleExpenseItemIdfortunecookiebind: pb.programId,
        vsd_cpu_fundedfromvscp: e.fundedFromVscp || 0,
        vsd_ProgramIdfortunecookiebind: e.uuid
      }
    }).forEach((x) => { p.ProgramExpenseCollection.push(x) });

    // SALARY AND BENEFITS costs the 10000000 as defined in the excel sheet
    pb.salariesAndBenefits.map((e: iSalaryAndBenefits): iDynamicsProgramExpense => {
      return {
        vsd_ProgramIdfortunecookiebind: pb.programId,
        vsd_cpu_fundedfromvscp: e.fundedFromVscp || 0,
        vsd_cpu_programexpensetype: expenseType.salaries_and_benefits,
        vsd_cpu_salary: e.salary || 0,
        vsd_cpu_titleposition: e.title || 'No title',
        vsd_programexpenseid: e.uuid,
        vsd_totalcost: e.totalCost || 0,
        vsd_cpu_benefits: e.benefits || 0,
      }
    }).forEach((x: iDynamicsProgramExpense) => { p.ProgramExpenseCollection.push(x) });

    // REVENUE SOURCES as defined in the excel sheet
    pb.revenueSources.map((e: iRevenueSource): iDynamicsProgramRevenueSource => {
      return {
        vsd_inkindcontribution: e.inKindContribution || 0,
        vsd_cpu_revenuesourcetype: revenueSourceValue(e.revenueSourceName),
        vsd_programrevenuesourceid: e.uuid,
        vsd_cashcontribution: e.cash,
        vsd_ProgramIdfortunecookiebind: pb.programId,
      }
    }).forEach((x: iDynamicsProgramRevenueSource) => { p.ProgramRevenueSourceCollection.push(x) });
  })
  return p;
}

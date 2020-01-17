import { iDynamicsBudgetProposalPost, iDynamicsProgramRevenueSource } from "../dynamics-post";
import { TransmogrifierBudgetProposal } from "../transmogrifier-budget-proposal.class";
import { iProgramBudget } from "../program-budget.interface";
import { iExpenseItem } from "../expense-item.interface";
import { iSalaryAndBenefits } from "../salary-and-benefits.interface";
import { iRevenueSource } from "../revenue-source.interface";
import { revenueSourceValue } from "../../constants/revenue-source-type";

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
    // pb.administrationCosts.map((e: iExpenseItem): => { }).forEach((x)=>{p.ProgramExpenseCollection.push(x)});
    // pb.programDeliveryCosts.map((e: iExpenseItem) => { }).forEach((x)=>{p.ProgramExpenseCollection.push(x)});
    // pb.salariesAndBenefits.map((e: iSalaryAndBenefits) => { }).forEach((x)=>{p.ProgramExpenseCollection.push(x)});
    // pb.administrationOtherExpenses.map((e: iExpenseItem) => { }).forEach((x)=>{p.ProgramExpenseCollection.push(x)});
    // pb.programDeliveryOtherExpenses.map((e: iExpenseItem) => { }).forEach((x) => { p.ProgramExpenseCollection.push(x) });
    // assemble revenue sources
    pb.revenueSources.map((e: iRevenueSource): iDynamicsProgramRevenueSource => {
      return {
        vsd_inkindcontribution: e.inKindContribution || 0,
        vsd_cpu_revenuesourcetype: revenueSourceValue(e.revenueSourceName),
        vsd_programrevenuesourceid: e.uuid,
        vsd_cashcontribution: e.cash,
        vsd_ProgramIdfortunecookiebind: pb.programId,
      }
    }).forEach((x) => { p.ProgramRevenueSourceCollection.push(x) });
  });

  return p;
}

// SalaryAndBenefitCollection goes into
// ProgramDeliveryCostCollection goes into
// AdministrationCostCollection goes into
// ProgramRevenueSourceCollection
// EligibleExpenseItemCollection
// ProgramTypeCollection

import { iPerson } from './person.class';
import { iRevenueSource } from './revenue-source.class';

export interface iBudgetProposal {
  organizationId: string;
  contractId: string;
  programs: iProgramBudget[];
  formState: string; // untouched	incomplete	invalid	complete info
}
export interface iProgramBudget {
  contractId: string;
  programId: string;
  name: string;
  type: string;
  formState: string; // untouched	incomplete	invalid	complete info
  email: string;
  revenueSources: iRevenueSource[];
  salariesAndBenefits: iPerson[];
  programDeliveryCosts: iExpenseItem[];
  programDeliveryMemberships: iExpenseItem[];
  programDeliveryOtherExpenses: iExpenseItem[];
  administrationCosts: iExpenseItem[];
  administrationOtherExpenses: iExpenseItem[];
}

export interface iExpenseItem {
  itemName: string;
  tooltip?: string;
  totalCost: number;
  fundedFromVscp: number;
}
export class ExpenseItem {
  itemName: string;
  tooltip: string;
  totalCost: number;
  fundedFromVscp: number;
  constructor(xi?: iExpenseItem) {
    if (xi) {
      this.itemName = xi.itemName || null;
      this.tooltip = xi.tooltip || null;
      this.totalCost = xi.totalCost || null;
      this.fundedFromVscp = xi.fundedFromVscp || null;
    }
  }
}

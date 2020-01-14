import { iRevenueSource } from "./revenue-source.interface";
import { iExpenseItem } from "./expense-item.interface";
import { iSalaryAndBenefits } from "./salary-and-benefits.interface";

export interface iProgramBudget {
  contractId: string;
  programId: string;
  name: string;
  type?: string;
  formState?: string; // untouched	incomplete	invalid	complete info
  email: string;
  administrationCosts: iExpenseItem[];
  administrationOtherExpenses: iExpenseItem[];
  programDeliveryCosts: iExpenseItem[];
  programDeliveryOtherExpenses: iExpenseItem[];
  revenueSources: iRevenueSource[];
  salariesAndBenefits: iSalaryAndBenefits[];
}

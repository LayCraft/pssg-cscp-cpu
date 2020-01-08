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
  revenueSources: iRevenueSource[];
  salariesAndBenefits: iSalaryAndBenefits[];
  programDeliveryCosts: iExpenseItem[];
  programDeliveryMemberships: iExpenseItem[];
  programDeliveryOtherExpenses: iExpenseItem[];
  administrationCosts: iExpenseItem[];
  administrationOtherExpenses: iExpenseItem[];
}

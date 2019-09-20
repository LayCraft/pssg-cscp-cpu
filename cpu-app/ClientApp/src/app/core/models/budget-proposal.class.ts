import { iPerson } from './person.class';
import { iRevenueSource } from './revenue-source.class';

export interface iBudgetProposal {
	programs: iProgramBudget[];
}
interface iProgramBudget {
	name: string;
	type: string;
	email: string;
	revenueSources: iRevenueSource[];
	salariesAndBenefits: iPerson[];
	programDeliveryCosts: iExpenseItem[];
	programDeliveryMemberships: iExpenseItem[];
	programDeliveryOtherExpenses: iExpenseItem[];
	administrationCosts: iExpenseItem[];
	administrationOtherExpenses: iExpenseItem[];
}

interface iExpenseItem {
	itemName: string;
	tooltip?: string;
	totalCost: number;
	fundedFromVCSP: number;
}
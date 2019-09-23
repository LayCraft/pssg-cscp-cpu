import { iPerson } from './person.class';
import { iRevenueSource } from './revenue-source.class';

export interface iBudgetProposal {
	organizationId: string;
	contractId: string;
	programs: iProgramBudget[];
	formState: string; // untouched	incomplete	invalid	complete
}
export interface iProgramBudget {
	programId: string;
	name: string;
	type: string;
	formState: string; // untouched	incomplete	invalid	complete
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
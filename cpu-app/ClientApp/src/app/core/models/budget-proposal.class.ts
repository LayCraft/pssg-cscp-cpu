import { iPerson, Person } from './person.class';
import { iRevenueSource } from './program-application.class';

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
export class ProgramBudget {
	contractId: string;
	programId: string;
	name: string;
	type: string;
	formState: string; // untouched	incomplete	invalid	complete info
	email: string;
	revenueSources: iRevenueSource[];
	salariesAndBenefits: iPerson[] = [];
	programDeliveryCosts: iExpenseItem[] = [];
	programDeliveryMemberships: iExpenseItem[] = [];
	programDeliveryOtherExpenses: iExpenseItem[] = [];
	administrationCosts: iExpenseItem[] = [];
	administrationOtherExpenses: iExpenseItem[] = [];
	constructor(pb: iProgramBudget) {
		if (pb) {
			this.contractId = pb.contractId || null;
			this.programId = pb.programId || null;
			this.name = pb.name || null;
			this.type = pb.type || null;
			this.formState = pb.formState || null;
			this.email = pb.email || null;
			this.revenueSources = pb.revenueSources || null;
			// if it exists loop over item and make a new object otherwise set the property to a blank array
			pb.salariesAndBenefits ? pb.salariesAndBenefits.forEach(x => this.salariesAndBenefits.push(new Person(x))) : this.salariesAndBenefits = [];
			pb.programDeliveryCosts ? pb.programDeliveryCosts.forEach(x => this.programDeliveryCosts.push(new ExpenseItem(x))) : this.programDeliveryCosts = [];
			pb.programDeliveryMemberships ? pb.programDeliveryMemberships.forEach(x => this.programDeliveryMemberships.push(new ExpenseItem(x))) : this.programDeliveryMemberships = [];
			pb.programDeliveryOtherExpenses ? pb.programDeliveryOtherExpenses.forEach(x => this.programDeliveryOtherExpenses.push(new ExpenseItem(x))) : this.programDeliveryOtherExpenses = [];
			pb.administrationCosts ? pb.administrationCosts.forEach(x => this.administrationCosts.push(new ExpenseItem(x))) : this.administrationCosts = [];
			pb.administrationOtherExpenses ? pb.administrationOtherExpenses.forEach(x => this.administrationOtherExpenses.push(new ExpenseItem(x))) : this.administrationOtherExpenses = [];
		}
	}
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
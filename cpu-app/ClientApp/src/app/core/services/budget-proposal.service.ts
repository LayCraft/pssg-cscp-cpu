import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iBudgetProposal } from '../models/budget-proposal.class';

@Injectable({
	providedIn: 'root'
})
export class BudgetProposalService {
	dummyBudget = {
		organizationId: 'StarFleet',
		contractId: 'ncc-1701',
		formState: 'incomplete',
		programs: [
			{
				formState: 'complete',
				programId: 'guiduuidguid',
				name: 'Social Work Andoria',
				type: 'PVBS',
				email: 'JeanLuc@enterprise.com',
				revenueSources: [
					{
						revenueSourceName: 'Ministry of PSSG-VSCP',
						cash: 34000,
						inKindContribution: 12350,
					},
					{
						revenueSourceName: 'Municipal Government',
						cash: 34000,
						inKindContribution: 12350,
					},
					{
						revenueSourceName: 'Regional District',
						cash: 34000,
						inKindContribution: 12350,
					}
				],
				salariesAndBenefits: [
					{
						title: 'CEO',
						annualSalary: 90010,
						benefits: 2345,
						fundedFromVCSP: 2345
					},
					{
						title: 'Helper',
						annualSalary: 1234,
						benefits: 38472,
						fundedFromVCSP: 23
					}
				],
				programDeliveryCosts: [
					{
						itemName: 'Management salary/benefits',
						tooltip: 'This is what would be in a tooltip.',
						totalCost: 293874,
						fundedFromVCSP: 123432,
					},
					{
						itemName: 'Other salary/benefits',
						tooltip: 'This is what would be in a tooltip.',
						totalCost: 293874,
						fundedFromVCSP: 123432,
					},
					{
						itemName: 'Employee salary/benefits',
						tooltip: 'This is what would be in a tooltip.',
						totalCost: 293874,
						fundedFromVCSP: 123432,
					},
				],
				programDeliveryMemberships: [
					{
						itemName: 'Employee membership',
						tooltip: 'This is what would be in a tooltip.',
						totalCost: 293874,
						fundedFromVCSP: 1233,
					},
				],
				programDeliveryOtherExpenses: [
					{
						itemName: 'Another Expense',
						tooltip: 'This is what would be in a tooltip.',
						totalCost: 634,
						fundedFromVCSP: 1432,
					},
				],
				administrationCosts: [
					{
						itemName: 'Another administrative cost',
						tooltip: 'This is what would be in a tooltip.',
						totalCost: 324,
						fundedFromVCSP: 14312,
					},
				],
				administrationOtherExpenses: [
					{
						itemName: 'Another Administrative Expense',
						tooltip: 'This is what would be in a tooltip.',
						totalCost: 6345764,
						fundedFromVCSP: 475,
					},
				],
			},
			{
				formState: 'incomplete',
				programId: 'guiduuidguid',
				name: 'Social Work Bajor',
				type: 'PVBS',
				email: 'BenSisco3@dsn.gov.com'
			},
			{
				formState: 'invalid',
				programId: 'guiduuidguid',
				name: 'Social Work Romulus',
				type: 'PVBS',
				email: 'BenSisco3@dsn.gov.com'
			},
		],
	} as iBudgetProposal;

	constructor() { }

	getBudgetProposal(organizationId: string, contractId: string): Observable<iBudgetProposal> {
		const bork = { ...this.dummyBudget };
		bork.organizationId = organizationId;
		bork.contractId = contractId;
		return of(bork as iBudgetProposal);
	}
}

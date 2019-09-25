import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iStepperElement } from 'src/app/shared/components/icon-stepper/icon-stepper.component';
import { BudgetProposalService } from 'src/app/core/services/budget-proposal.service';
import { iBudgetProposal, iProgramBudget } from 'src/app/core/models/budget-proposal.class';

@Component({
	selector: 'app-budget-page',
	templateUrl: './budget-page.component.html',
	styleUrls: ['./budget-page.component.scss']
})
export class BudgetPageComponent implements OnInit {
	contractId: string;
	organizationId: string;

	// used for building the template
	iconStepperElementsTop: iStepperElement[];
	iconStepperElementsPrograms: iStepperElement[];
	iconStepperElementsBottom: iStepperElement[];

	// used for the stepper component
	iconStepperElementsCombined: iStepperElement[];
	currentStepperElement: iStepperElement;

	constructor(
		private route: ActivatedRoute,
		private budgetProposalService: BudgetProposalService,
	) { }

	ngOnInit() {
		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');
		this.contractId = this.route.snapshot.paramMap.get('contractId');

		// set the default top and bottom list
		this.constructDefaultIconStepperElements(this.organizationId, this.contractId);

		// get the budget proposal for this org and contract
		this.budgetProposalService.getBudgetProposal(this.organizationId, this.contractId)
			.subscribe((bp: iBudgetProposal) => {
				// Many other ways to do this. Most hassle free is split the array, put the items in, concat
				// map the programs into the right shape
				this.iconStepperElementsPrograms = bp.programs.map((p: iProgramBudget) => {
					return {
						itemName: p.name,
						formState: p.formState || 'untouched', //default is untouched
						organizationId: this.organizationId,
						contractId: this.contractId,
						programId: p.programId
					}
				});
				// make a complete list of all items
				this.iconStepperElementsCombined = this.iconStepperElementsTop
					.concat(this.iconStepperElementsPrograms)
					.concat(this.iconStepperElementsBottom);

				// set the first page to be the program overview so it isn't blank when they see the page the first time
				this.currentStepperElement = this.iconStepperElementsCombined[0];
			});
	}

	programBudgetUpdated(programBudget: iProgramBudget): void {
		// handle the updates to the program budget. Write it out to a service or whatever
		console.log(programBudget);
	}

	isCurrentStepperElement(item: iStepperElement): boolean {
		if (item.itemName === this.currentStepperElement.itemName) {
			// names match? must be the same. Makes the assumption that all names are unique.
			return true;
		}
		return false;
	}
	constructDefaultIconStepperElements(organizationId: string, contractId: string) {
		// this is just a constructor
		this.iconStepperElementsTop = [
			{
				itemName: 'Program Overview',
				formState: 'info',
				organizationId,
				contractId
			},
			{
				itemName: 'Program Budget Summary',
				formState: 'info',
				organizationId,
				contractId
			}
		];
		this.iconStepperElementsBottom = [
			{
				itemName: 'Authorization',
				formState: 'untouched',
				organizationId,
				contractId
			},
		];
	}
}

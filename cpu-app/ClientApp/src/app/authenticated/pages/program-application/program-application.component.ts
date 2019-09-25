import { Component, OnInit } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';
import { ActivatedRoute } from '@angular/router';
import { BudgetProposalService } from 'src/app/core/services/budget-proposal.service';
import { iBudgetProposal, iProgramBudget } from 'src/app/core/models/budget-proposal.class';

@Component({
	selector: 'app-program-application',
	templateUrl: './program-application.component.html',
	styleUrls: ['./program-application.component.scss']
})
export class ProgramApplicationComponent implements OnInit {
	contractId: string;
	organizationId: string;

	// used for building the template
	stepperElementsTop: iStepperElement[];
	stepperElementsPrograms: iStepperElement[];
	stepperElementsBottom: iStepperElement[];

	// used for the stepper component
	stepperElementsCombined: iStepperElement[];
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
		this.constructDefaultstepperElements(this.organizationId, this.contractId);

		// get the budget proposal for this org and contract
		this.budgetProposalService.getBudgetProposal(this.organizationId, this.contractId)
			.subscribe((bp: iBudgetProposal) => {
				// Many other ways to do this. Most hassle free is split the array, put the items in, concat
				// map the programs into the right shape
				this.stepperElementsPrograms = bp.programs.map((p: iProgramBudget) => {
					return {
						itemName: p.name,
						formState: p.formState || 'untouched', //default is untouched
						organizationId: this.organizationId,
						contractId: this.contractId,
						programId: p.programId
					}
				});
				// make a complete list of all items
				this.stepperElementsCombined = this.stepperElementsTop
					.concat(this.stepperElementsPrograms)
					.concat(this.stepperElementsBottom);

				// set the first page to be the program overview so it isn't blank when they see the page the first time
				this.currentStepperElement = this.stepperElementsCombined[0];
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
	constructDefaultstepperElements(organizationId: string, contractId: string) {
		// this is just a constructor
		this.stepperElementsTop = [
			{
				itemName: 'Applicant Contact Information',
				formState: 'info',
				organizationId,
				contractId
			},
			{
				itemName: 'Applicant Administrative Information',
				formState: 'info',
				organizationId,
				contractId
			},
			{
				itemName: 'Commercial General Liability Insurance',
				formState: 'info',
				organizationId,
				contractId
			},
		];
		this.stepperElementsBottom = [
			{
				itemName: 'Review Program Application',
				formState: 'untouched',
				organizationId,
				contractId
			},
			{
				itemName: 'Authorization',
				formState: 'untouched',
				organizationId,
				contractId
			},
		];
	}

}

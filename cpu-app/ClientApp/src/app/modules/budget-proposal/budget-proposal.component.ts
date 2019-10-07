import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetProposalService } from 'src/app/core/services/budget-proposal.service';
import { iBudgetProposal, iProgramBudget } from 'src/app/core/models/budget-proposal.class';
import { iStepperElement, StepperService } from 'src/app/core/services/stepper.service';
import { iProgramInformation } from 'src/app/core/models/program-information.class';

@Component({
	selector: 'app-budget-proposal',
	templateUrl: './budget-proposal.component.html',
	styleUrls: ['./budget-proposal.component.scss']
})
export class BudgetProposalComponent implements OnInit {
	contractId: string;
	organizationId: string;

	programUuids: string[]; // a place to store all of the program uuids
	// used for the stepper component
	currentStepperElement: iStepperElement;
	stepperElements: iStepperElement[];

	constructor(
		private route: ActivatedRoute,
		private budgetProposalService: BudgetProposalService,
		private stepperService: StepperService
	) { }

	ngOnInit() {
		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');
		this.contractId = this.route.snapshot.paramMap.get('contractId');

		this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
		this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
		// set the default top and bottom list
		this.constructDefaultstepperElements();
	}

	isCurrentStepperElement(item: iStepperElement): boolean {
		if (item.itemName === this.currentStepperElement.itemName) {
			// names match? must be the same. Makes the assumption that all names are unique.
			return true;
		}
		return false;
	}
	constructDefaultstepperElements() {
		this.budgetProposalService.getBudgetProposal('foo', 'bar').subscribe((bp: iBudgetProposal) => {
			// write the default beginning
			[
				{
					itemName: 'Program Overview',
					formState: 'info',
					object: null,
					discriminator: 'program_overview',
				},
				{
					itemName: 'Program Budget Summary',
					formState: 'info',
					object: null,
					discriminator: 'program_budget_summary',
				}
			].forEach((f: iStepperElement) => {
				this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
			});

			bp.programs.forEach((p: iProgramBudget) => {
				this.stepperService.addStepperElement(p, p.name, p.formState, 'program');
			});

			// Write the default end part
			[
				{
					itemName: 'Authorization',
					formState: 'untouched',
					object: null,
					discriminator: 'authorization'
				},
			].forEach((f: iStepperElement) => {
				this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
			});
		});
	}
}

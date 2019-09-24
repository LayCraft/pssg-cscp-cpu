import { Component, OnInit } from '@angular/core';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { MatStepper } from '@angular/material';
import { AdministrativeInformation, iAdministrativeInformation } from 'src/app/core/models/administrative-information.class';
import { iProgramMeta } from 'src/app/core/models/program-information.class';
import { BoilerplateService } from 'src/app/core/services/boilerplate.service';
import { ProgramInformationService } from 'src/app/core/services/program-information.service';
import { ActivatedRoute } from '@angular/router';
import { iIconStepperElement } from 'src/app/shared/components/icon-stepper/icon-stepper.component';
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

	iconStepperElements: iIconStepperElement[] = [
		{
			itemName: 'Program Overview',
			formState: 'info' // Calculate these somehow?
		},
		{
			itemName: 'Program Budget Summary',
			formState: 'info' // Calculate these somehow?
		},
		{
			itemName: 'Authorization',
			formState: 'untouched' // Calculate these somehow?
		},
	];
	currentFormPage: string = '';
	formPages: string[] = [];
	budgetProposal: iBudgetProposal;


	constructor(
		private route: ActivatedRoute,
		private budgetProposalService: BudgetProposalService,
	) { }

	ngOnInit() {
		// TODO: the majority of the work here is too figure out how to get the data back from dynamics.

		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');
		this.contractId = this.route.snapshot.paramMap.get('contractId');

		// insert list of programs at stepper 2
		this.budgetProposalService.getBudgetProposal(this.organizationId, this.contractId).subscribe((bp: iBudgetProposal) => {
			// save the budget proposal object
			this.budgetProposal = bp;
			//set the state of the form overall
			this.changeIconStepperState('Authorization', bp.formState);
			// Many other ways to do this. Most hassle free is split the array, put the items in, concat
			const top: iIconStepperElement[] = this.iconStepperElements.slice(0, 1);
			// map the programs into the right shape
			const middle = bp.programs.map((p: iProgramBudget) => {
				return {
					itemName: p.name,
					formState: p.formState || 'untouched', //default is untouched
				}
			});
			// bottom of the list
			const bottom: iIconStepperElement[] = this.iconStepperElements.slice(1, 3);
			// save the work
			this.iconStepperElements = top.concat(middle).concat(bottom);
			// handy string list for navigating
			this.formPages = this.iconStepperElements.map(e => e.itemName);

			// set the first page to be the program overview so it isn't blank when they see the page the first time
			this.currentFormPage = this.formPages[0];
		});
	}
	changeIconStepperState(itemName: string, formState) {
		// finds the item and switches the state
		this.iconStepperElements = this.iconStepperElements.map((e: iIconStepperElement) => {
			if (e.itemName === itemName) {
				// formstate is updated to the requested string because it matches
				e.formState = formState;
			}
			// when the global updates the view will update.
			return e;
		})
	}
}

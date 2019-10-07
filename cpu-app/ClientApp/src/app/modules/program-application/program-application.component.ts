import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iStepperElement, StepperService } from 'src/app/core/services/stepper.service';
import { iProgramApplication } from 'src/app/core/models/program-application.class';
import { ProgramApplicationService } from 'src/app/core/services/program-application.service';

@Component({
	selector: 'app-program-application',
	templateUrl: './program-application.component.html',
	styleUrls: ['./program-application.component.scss']
})
export class ProgramApplicationComponent implements OnInit, OnDestroy {
	contractId: string;
	organizationId: string;

	// used for the stepper component
	stepperElements: iStepperElement[];
	currentStepperElement: iStepperElement;

	// used for building the template
	// stepperElementsTop: iStepperElement[];
	// stepperElementsPrograms: iStepperElement[];
	// stepperElementsBottom: iStepperElement[];

	// collection form for the contact information
	// contactInformationForm: FormGroup;

	// collection and validiy for administrative information form
	// administrativeInformationForm: iAdministrativeInformation;
	// administrativeInformationValid: boolean;
	// administrativeInformationIsValid(valid: boolean) {
	// 	// track the state of validity
	// 	this.administrativeInformationValid = valid;
	// }

	// cg liability toggle value
	// cgLiability: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private programApplicationService: ProgramApplicationService,
		private stepperService: StepperService,
	) { }

	ngOnInit() {
		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');
		this.contractId = this.route.snapshot.paramMap.get('contractId');

		// keep this component in sync with the stepper service
		this.stepperService.reset();
		this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
		this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
		// set the default top and bottom of the list
		this.constructDefaultstepperElements();

		// // get the budget proposal for this org and contract
		// this.budgetProposalService.getBudgetProposal(this.organizationId, this.contractId)
		// 	.subscribe((bp: iBudgetProposal) => {
		// 		// Many other ways to do this. Most hassle free is split the array, put the items in, concat
		// 		// map the programs into the right shape
		// 		this.stepperElementsPrograms = bp.programs.map((p: iProgramBudget) => {
		// 			return {
		// 				// contractId: this.contractId,
		// 				// organizationId: this.organizationId,
		// 				// programId: p.programId,
		// 				formState: p.formState || 'untouched', //default is untouched
		// 				itemName: p.name,
		// 				object: p, // this iProgramBudget can be used for forms information
		// 			} as iStepperElement;
		// 		});
		// 		// make a complete list of all items
		// 		this.stepperElementsCombined = this.stepperElementsTop
		// 			.concat(this.stepperElementsPrograms)
		// 			.concat(this.stepperElementsBottom);

		// 		// set the first page to be the program overview so it isn't blank when they see the page the first time
		// 		this.currentStepperElement = this.stepperElementsCombined[0];
		// 	});

		// // collect information about the default contact information and prefill the form with it
		// // THE FORM FOR THE APPLICANT CONTACT INFORMATION
		// this.boilerplateService.getOrganizationBoilerplate(this.organizationId).subscribe(ci => {
		// 	this.contactInformationForm = new FormGroup({
		// 		'contactInformation': new FormControl('', Validators.required)
		// 	});
		// 	this.contactInformationForm.controls['contactInformation'].setValue(ci);
		// });

		// // THE FORM FOR THE ADMINISTRATIVE INFORMATION
		// this.administrativeInformationForm = new AdministrativeInformation();
	}
	ngOnDestroy() {
		this.stepperService.reset();
	}

	programApplicationUpdated(programApplication: iProgramApplication): void {
		// handle the updates to the program budget. Write it out to a service or whatever
		console.log(programApplication);
	}

	isCurrentStepperElement(item: iStepperElement): boolean {
		if (item.itemName === this.currentStepperElement.itemName) {
			// names match? must be the same. Makes the assumption that all names are unique.
			return true;
		}
		return false;
	}
	constructDefaultstepperElements() {

		// // this is just a constructor
		// this.stepperElementsTop = [
		// 	{
		// 		itemName: 'Applicant Contact Information',
		// 		formState: 'info',
		// 		organizationId,
		// 		contractId
		// 	},
		// 	{
		// 		itemName: 'Applicant Administrative Information',
		// 		formState: 'info',
		// 		organizationId,
		// 		contractId
		// 	},
		// 	{
		// 		itemName: 'Commercial General Liability Insurance',
		// 		formState: 'info',
		// 		organizationId,
		// 		contractId
		// 	},
		// ];
		// this.stepperElementsBottom = [
		// 	{
		// 		itemName: 'Review Program Application',
		// 		formState: 'untouched',
		// 		organizationId,
		// 		contractId
		// 	},
		// 	{
		// 		itemName: 'Authorization',
		// 		formState: 'untouched',
		// 		organizationId,
		// 		contractId
		// 	},
		// ];
	}

}

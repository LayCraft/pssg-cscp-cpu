import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iStepperElement, StepperService } from 'src/app/core/services/stepper.service';
import { iProgramApplication, iAnnualProgramApplication } from 'src/app/core/models/program-application.class';
import { ProgramApplicationService } from 'src/app/core/services/program-application.service';

@Component({
	selector: 'app-program-application',
	templateUrl: './program-application.component.html',
	styleUrls: ['./program-application.component.scss']
})
export class ProgramApplicationComponent implements OnInit {
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

	}

	programApplicationUpdated(programApplication: iProgramApplication): void {
		// handle the updates to the program budget. Write it out to a service or whatever
		console.log(programApplication);
	}

	isCurrentStepperElement(item: iStepperElement): boolean {
		if (item.id === this.currentStepperElement.id) {
			// names match? must be the same. Makes the assumption that all names are unique.
			return true;
		}
		return false;
	}
	constructDefaultstepperElements() {
		this.programApplicationService.getProgramApplication('foo', 'bar').subscribe((pa: iAnnualProgramApplication) => {
			// write the default beginning
			[
				{
					itemName: 'Applicant Contact Information',
					formState: 'untouched',
					object: null,
					discriminator: 'contact_information',
				},
				{
					itemName: 'Applicant Administrative Information',
					formState: 'untouched',
					object: null,
					discriminator: 'administrative_information',
				},
				{
					itemName: 'Commercial General Liability Insurance',
					formState: 'untouched',
					object: null,
					discriminator: 'commercial_general_liability_insurance',
				},
			].forEach((f: iStepperElement) => {
				this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
			});

			// TODO: add the programs to the list
			pa.programs.forEach((p: iProgramApplication) => {
				this.stepperService.addStepperElement(p, p.name, p.formState, 'program')
			});
			// Write the default end part
			[
				{
					itemName: 'Review Program Application',
					formState: 'untouched',
					object: null,
					discriminator: 'review_application',
				},
				{
					itemName: 'Authorization',
					formState: 'untouched',
					object: null,
					discriminator: 'authorization',
				},
			].forEach((f: iStepperElement) => {
				this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
			});

		});
		// // this is just a constructor
		// [
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

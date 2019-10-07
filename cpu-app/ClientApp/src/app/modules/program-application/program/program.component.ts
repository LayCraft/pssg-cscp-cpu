import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iProgramApplication, ProgramApplication, Hours } from 'src/app/core/models/program-application.class';
import { ContactInformation } from 'src/app/core/models/contact-information.class';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-program',
	templateUrl: './program.component.html',
	styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
	@Input() programApplication: iProgramApplication;
	@Output() programApplicationChange = new EventEmitter<iProgramApplication>();

	// the form model
	programInformationForm: ProgramApplication;
	differentProgramContact: boolean = false;
	programContactForm: ContactInformation;
	operationHours: Hours[] = [];
	standbyHours: Hours[] = [];

	currentTab: string;
	tabs: string[];

	constructor(
		// private boilerplateService: BoilerplateService,
		// private programInformationService: ProgramInformationService,
	) {
		this.tabs = ['Contact Information', 'Delivery Information', 'Reporting Requirements'];
		this.currentTab = this.tabs[0];
	}

	ngOnInit() {
		this.programInformationForm = new ProgramApplication();
		this.programContactForm = new ContactInformation();
		this.addOperationHours();
		this.addStandbyHours();
		// initialize the program information if it is supplied else make a new object
		// this.programInformationService.getProgramInformation(this.programMeta.organizationId, this.programMeta.programId).subscribe((p: iProgramInformation) => {
		//   this.programInformationForm = new ProgramInformation(p);
		// });
	}

	// form helpers. Validity hints and hide/show toggles
	showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
	showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }
	onInput() { }

	showProgramContact() {
		// Whether turned off or on we wipe out the contact information
		this.programContactForm = new ContactInformation();
		this.differentProgramContact = !this.differentProgramContact;
	}

	addOperationHours() {
		this.operationHours.push(new Hours());
	}
	addStandbyHours() {
		this.standbyHours.push(new Hours());
	}
}

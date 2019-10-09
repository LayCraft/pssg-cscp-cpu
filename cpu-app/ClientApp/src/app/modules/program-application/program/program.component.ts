import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iProgramApplication, ProgramApplication, Hours } from 'src/app/core/models/program-application.class';
import { AbstractControl } from '@angular/forms';
import { iPerson } from 'src/app/core/models/person.class';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
	selector: 'app-program',
	templateUrl: './program.component.html',
	styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
	@Input() programApplication: iProgramApplication;
	@Output() programApplicationChange = new EventEmitter<iProgramApplication>();
	required = false;
	// the form model
	programInformationForm: ProgramApplication;
	differentProgramContact: boolean = false;

	currentTab: string;
	tabs: string[];
	persons: iPerson[] = [];

	constructor(
		private personService: PersonService,
		// private boilerplateService: BoilerplateService,
		// private programInformationService: ProgramInformationService,
	) {
		this.tabs = ['Contact Information', 'Delivery Information', 'Reporting Requirements'];
		this.currentTab = this.tabs[0];
	}

	ngOnInit() {
		this.personService.getPersons('foobarbazqux').subscribe(p => this.persons = p);
		this.programInformationForm = new ProgramApplication();
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
		this.differentProgramContact = !this.differentProgramContact;
	}

	addOperationHours() {
		this.programInformationForm.operationHours.push(new Hours());
	}
	addStandbyHours() {
		this.programInformationForm.standbyHours.push(new Hours());
	}

	onProgramContactChange(event: iPerson) {
		this.programInformationForm.programContact = event;
	}
	onPaidStaffChange(event: iPerson[]) {
		this.programInformationForm.additionalStaff = event;
	}
}

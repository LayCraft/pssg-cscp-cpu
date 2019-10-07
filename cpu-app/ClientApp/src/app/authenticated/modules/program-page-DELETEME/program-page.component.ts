import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material';
import { BoilerplateService } from 'src/app/core/services/boilerplate.service';
import { AdministrativeInformation, iAdministrativeInformation } from 'src/app/core/models/administrative-information.class';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { ProgramApplicationService } from 'src/app/core/services/program-application.service';



@Component({
	selector: 'app-program-page',
	templateUrl: './program-page.component.html',
	styleUrls: ['./program-page.component.scss']
})
export class ProgramPageComponent implements OnInit {

	contractId: string;
	organizationId: string;
	pageList: string[];

	upperItems: string[] = ['Applicant Contact Information', 'Applicant Administrative Information', 'Commercial General Liability Insurance'];
	programs: string[];
	lowerItems: string[] = ['Review Program Application', 'Authorization'];
	combinedPageList: string[];

	currentFormPage: string = '';
	canSubmit: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private programInformationService: ProgramApplicationService,
		private boilerplateService: BoilerplateService,
	) { }

	ngOnInit() {
		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('orgid');
		this.contractId = this.route.snapshot.paramMap.get('id');
		// this.programInformationService.getProgramInformationMeta(this.organizationId, this.contractId).subscribe(
		// 	(pm: iProgramMeta[]) => {
		// 		this.programMeta = pm;
		// 		// save the program names
		// 		this.programs = this.programMeta.map((p: iProgramMeta) => p.programName)
		// 		// make a complete page list
		// 		this.combinedPageList = [...this.upperItems, ...this.programs, ...this.lowerItems];
		// 		// set the current page to the first page
		// 		this.currentFormPage = this.combinedPageList[0];
		// 	});

		// get the boilerplate contact information if there is none included (resuming the forms.)
		// TODO: eventually we need to get the current forms from the service
		if (!this.contactInformation) this.boilerplateService.getOrganizationBoilerplate(this.organizationId)
			.subscribe(ci => this.contactInformation = ci);
		this.administrativeInformation = new AdministrativeInformation();
	}

	gotoPage(selectPage: MatStepper): void {
		window.scroll(0, 0);
		this.currentFormPage = this.combinedPageList[selectPage.selectedIndex];
	}
	cancel() { }
	showSummaryOfBenefits() { }
	gotoNextStep(event?) {
		// this just sends the user along to the next page.
		console.log(event)
	}

	saveContactInfo(event?: iContactInformation) {
		// when the user confirms the contact info we save it as partial data.
		console.log(event);
	}

	// Methods and
	contactValid: boolean;
	contactInformation: iContactInformation;
	contactIsValid(valid: boolean) {
		// track the state of validity
		this.contactValid = valid;
	}
	contactInformationSave() {
		if (this.contactValid) {
			// TODO: just print to console for now
			console.log('Save the contact information to the contract service')
			console.log(this.contactInformation);
		} else alert('This should not be clickable right now.')
		// todo: this should save the form information to a service.
	}

	administrativeInformationValid: boolean;
	administrativeInformation: iAdministrativeInformation;
	administrativeInformationIsValid(valid: boolean) {
		// track the state of validity
		this.administrativeInformationValid = valid;
	}
	administrativeInformationSave() {
		if (this.administrativeInformationIsValid) {
			// TODO: just print to console for now
			console.log('Save the administrative information to the contract service.')
			console.log(this.administrativeInformation);
		} else alert('This should not be clickable right now.');
		// todo: this should save the form information to a service.  }
	}

	cgLiability: string = '';
	cgLiabilitySave() {
		if (this.cgLiability) {
			// just print to console for now
			console.log('Save the group liability information to the contract service')
			console.log(this.cgLiability);
		} else alert('Nothing was selected!');

		// todo: this should save the form information to a service.  }
	}
	unlock(key: boolean) {
		// console.log(key);
		// unlocks the whole set of forms for submission
		if (key) alert('All things are checked!');
	}
}

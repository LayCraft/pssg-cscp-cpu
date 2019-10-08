import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { FormHelper } from 'src/app/core/form-helper';
import { EMAIL } from 'src/app/core/constants/regex.constants'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoilerplateService } from 'src/app/core/services/boilerplate.service';

@Component({
	selector: 'app-program-contact-information',
	templateUrl: './program-contact-information.component.html',
	styleUrls: ['./program-contact-information.component.scss']
})
export class ProgramContactInformationComponent implements OnInit {
	// this collects all of the information for all programs so we are actually collecting parent data
	// we should patch it into the data on change
	@Input() contactInformation: iContactInformation;
	@Output() contactInformationChange = new EventEmitter<iContactInformation>();
	@Input() required = true;
	@Input() title = 'Primary Program Contact Information';

	formHelper = new FormHelper();
	contactInformationForm: FormGroup;
	constructor(
		private boilerplateService: BoilerplateService
	) { }

	ngOnInit() {
		this.boilerplateService.getOrganizationBoilerplate('foobazqux').subscribe(ci => {
			this.contactInformationForm = new FormGroup({
				'contactInformation': new FormControl('', Validators.required)
			});
			this.contactInformationForm.controls['contactInformation'].setValue(ci);
		});
	}
	onInput() {
		console.log(this.contactInformationForm.value['contactInformation'])
		// emit the information
		this.contactInformationChange.emit(this.contactInformationForm.value['contactInformation']);
	}
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { BoilerplateService } from 'src/app/core/services/boilerplate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PHONE_NUMBER, EMAIL } from 'src/app/core/constants/regex.constants';
import { FormHelper } from 'src/app/core/form-helper'

@Component({
	selector: 'app-contact-information',
	templateUrl: './contact-information.component.html',
	styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent implements OnInit {
	@Input() contactInformation: iContactInformation;
	@Output() contactInformationChange = new EventEmitter<iContactInformation>();

	contactInformationForm: FormGroup;

	// helpers for setting form state
	public formHelper = new FormHelper();

	constructor() { }
	ngOnInit() {
		// instantiate this with existing data if it is supplied.
		this.buildForm(this.contactInformation);
	}

	// getters for the template syntax to collect the form fields
	get emailAddress() { return this.contactInformationForm.get('emailAddress') }
	get mainAddress() { return this.contactInformationForm.get('mainAddress') }
	get mailingAddress() { return this.contactInformationForm.get('mailingAddress') }
	get phoneNumber() { return this.contactInformationForm.get('phoneNumber') }
	get faxNumber() { return this.contactInformationForm.get('faxNumber') }
	get hasMailingAddress() { return this.contactInformationForm.get('hasMailingAddress') }


	buildForm(contactInformation: iContactInformation) {
		// build the form
		this.contactInformationForm = new FormGroup({
			'emailAddress': new FormControl('', [Validators.required, Validators.pattern(EMAIL)]),
			'mainAddress': new FormControl(null, Validators.required),
			'mailingAddress': new FormControl(),
			'phoneNumber': new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER)]),
			'faxNumber': new FormControl('', [Validators.pattern(PHONE_NUMBER)]),
			'hasMailingAddress': new FormControl(false), // we don't care about this. It is untracked
		});
		//fill the form with passed information
	}

	getTidyFormData(): iContactInformation {
		// trim strings and return objects
		return {
			emailAddress: this.emailAddress.value.trim() || null,
			mainAddress: this.mainAddress.value,
			mailingAddress: this.mailingAddress.value,
			phoneNumber: this.phoneNumber.value.trim() || null,
			faxNumber: this.faxNumber.value.trim() || null,
		};
	}
	emitContactInformation() {
		// only emit the contact information if this form is valid.
		if (this.contactInformationForm.valid) {
			this.contactInformationChange.emit(this.getTidyFormData());
		} else {
			this.contactInformationChange.emit(null);
		}
	}
}

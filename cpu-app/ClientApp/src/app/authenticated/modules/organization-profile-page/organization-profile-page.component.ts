import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { BoilerplateService } from 'src/app/core/services/boilerplate.service';
import { iAddress } from 'src/app/core/models/address.class';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PHONE_NUMBER } from 'src/app/core/constants/regex.constants';
import { FormHelper } from 'src/app/core/form-helper'
@Component({
	selector: 'app-organization-profile-page',
	templateUrl: './organization-profile-page.component.html',
	styleUrls: ['./organization-profile-page.component.scss']
})
export class OrganizationProfilePageComponent implements OnInit {
	organizationId: string = 'bceid goes here';
	contactInformation: iContactInformation;
	validContactInformation: boolean = false;
	testAddress: FormGroup;

	// helpers for setting form state
	public formHelper = new FormHelper();

	constructor(
		private boilerplateService: BoilerplateService,
		private router: Router
	) { }

	get hasMailingAddress() { return this.testAddress.get('hasMailingAddress') }
	get phoneNumber() { return this.testAddress.get('phoneNumber') }
	get faxNumber() { return this.testAddress.get('faxNumber') }

	ngOnInit() {
		this.buildForm();

		// this.boilerplateService.getOrganizationBoilerplate(this.organizationId)
		// 	.subscribe(ci => {
		// 		// save the boilerplate information into a place that we can edit it
		// 		this.contactInformation = ci;
		// 	});
	}

	buildForm() {
		this.testAddress = new FormGroup({
			'mainAddress': new FormControl(null, Validators.required),
			'hasMailingAddress': new FormControl(false),
			'mailingAddress': new FormControl(),
			'phoneNumber': new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER)]),
			'faxNumber': new FormControl('', [Validators.pattern(PHONE_NUMBER)]),
		});
	}
	onSave() {
		this.boilerplateService.setOrganizationBoilerplate(this.organizationId, this.contactInformation).subscribe(
			res => this.router.navigate(['/dashboard']),
			err => {
				alert('An error has occured. Please try submitting again.');
				console.log(err);
			}
		);
	}
	onValid(valid: boolean) {
		// set the validity to enable form controls
		this.validContactInformation = valid;
	}
}

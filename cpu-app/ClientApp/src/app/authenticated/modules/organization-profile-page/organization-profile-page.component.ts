import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { BoilerplateService } from 'src/app/core/services/boilerplate.service';
import { Subject } from 'rxjs';
import { iAddress } from 'src/app/core/models/address.class';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PHONE_NUMBER } from 'src/app/core/constants/regex.constants';

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


	public addressUpdated(address: iAddress) {
		console.log(address);
	}


	constructor(
		private boilerplateService: BoilerplateService,
		private router: Router
	) { }

	get hasMailingAddress() { return this.testAddress.get('hasMailingAddress') }
	get phoneNumber() { return this.testAddress.get('phoneNumber') }
	get faxNumber() { return this.testAddress.get('faxNumber') }

	ngOnInit() {
		this.testAddress = new FormGroup({
			'mainAddress': new FormControl(null, Validators.required),
			'hasMailingAddress': new FormControl(false),
			'mailingAddress': new FormControl(),
			'phoneNumber': new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER)]),
			'faxNumber': new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER)]),
		});


		this.boilerplateService.getOrganizationBoilerplate(this.organizationId)
			.subscribe(ci => {
				// save the boilerplate information into a place that we can edit it
				this.contactInformation = ci;
			});

		// if (this.contactInformation) {
		//   // if the organization ID is passed in then get it from the boilerplate service
		//   this.boilerplateService.getOrganizationBoilerplate(this.organizationId).subscribe((info: iContactInformation) => {
		//     // when the component loads make a new working contact information object to do the form work in
		//     this.contactInformation = new ContactInformation(info);

		//     // TODO: In the future we can convert the dynamics junk data into a useful collection.
		//     // const ci: ContactInformation = new ContactInformation();
		//     // ci.fromDynamics(info);
		//     // this.contactInformation = ci;

		//     // if there is something returned in the mailing address then we should show the section
		//     if (info.mailingAddress) {
		//       this.hasMailingAddress = true;
		//     }
		//   });
		// } else {
		//   // no included organization ID? make a blank form.
		//   this.contactInformation = new ContactInformation();
		// }
	}

	// form helpers. Validity hints and hide/show toggles
	showValidFeedback(control: AbstractControl): boolean {
		return !(control.valid && (control.dirty || control.touched));
	}
	showInvalidFeedback(control: AbstractControl): boolean {
		return !(control.invalid && (control.dirty || control.touched));
	}
	isDirtyOrTouched(control: AbstractControl) {
		if (control.dirty || control.touched) {
			return true;
		} else {
			return null;
		}
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

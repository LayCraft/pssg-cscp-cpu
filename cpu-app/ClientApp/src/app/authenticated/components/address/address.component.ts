import { Component, OnInit } from '@angular/core';
import { iAddress } from 'src/app/core/models/address.class';
import { NgxSubFormComponent, Controls, subformComponentProviders } from 'ngx-sub-form';
import { FormControl, AbstractControl } from '@angular/forms';
import { COUNTRIES_ADDRESS_2, iCountry } from 'src/app/core/constants/country-list';


@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss'],
	providers: subformComponentProviders(AddressComponent),
})
export class AddressComponent extends NgxSubFormComponent<iAddress> implements OnInit {
	required: boolean = true;
	country: iCountry; // currently selected country

	// this is not a form only part of a form. This needs 
	protected getFormControls(): Controls<iAddress> {
		return {
			line1: new FormControl(),
			line2: new FormControl(),
			city: new FormControl(),
			postalCode: new FormControl(),
			province: new FormControl(),
			country: new FormControl(),
		}
	}
	// form helpers. Validity hints and hide/show toggles
	showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
	showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }

	ngOnInit() {
		// set country to canada
		this.country = COUNTRIES_ADDRESS_2.Canada;
	}
}

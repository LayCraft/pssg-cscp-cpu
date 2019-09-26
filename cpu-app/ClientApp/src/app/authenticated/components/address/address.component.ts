import { Component, forwardRef, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { iAddress } from 'src/app/core/models/address.class';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { COUNTRIES_ADDRESS_2, iCountry } from 'src/app/core/constants/country-list';
import { POSTAL_CODE, WORD } from 'src/app/core/constants/regex.constants';

@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AddressComponent),
			multi: true,
		}
	]
})
export class AddressComponent implements ControlValueAccessor, OnInit {
	// a viewchild to check the validity of the template form
	@Input() disabled: boolean = false;
	@Input() required: boolean = false;
	@Input() address: iAddress;
	@Output() addressChange = new EventEmitter<iAddress>();

	ngOnInit() {
		this.buildForm(this.address);
	}

	addressForm: FormGroup;

	// this AddressComponent is not a form only part of a form. This needs
	country: iCountry; // currently selected country
	postalCodeRegex: RegExp;
	hasCharactersRegex: RegExp;

	constructor() {
		// set country to canada
		this.country = COUNTRIES_ADDRESS_2.Canada;
		// save validation pattern for regex
		this.postalCodeRegex = POSTAL_CODE;
		//has to have at least a character or two
		this.hasCharactersRegex = WORD;
	}

	get line1() { return this.addressForm.get('line1') }
	get line2() { return this.addressForm.get('line2') }
	get city() { return this.addressForm.get('city') }
	get province() { return this.addressForm.get('province') }
	get postalCode() { return this.addressForm.get('postalCode') }

	// form helpers. Validity hints and hide/show toggles
	showValidFeedback(control: AbstractControl): boolean {
		return !(control.valid && (control.dirty || control.touched));
	}
	showInvalidFeedback(control: AbstractControl): boolean {
		return !(control.invalid && (control.dirty || control.touched));
	}
	isRequired(control: AbstractControl) {
		if (this.required && (control.dirty || control.touched)) {
			return true;
		} else {
			return null;
		}
	}

	buildForm(address: iAddress) {
		// note this form is missing a country dropdown because i don't need it in the wireframes. The address oobject supports it
		if (this.required) {
			this.addressForm = new FormGroup({
				'line1': new FormControl('', [Validators.required, Validators.pattern(this.hasCharactersRegex)]),
				'line2': new FormControl(''),
				'city': new FormControl('', [Validators.required, Validators.pattern(this.hasCharactersRegex)]),
				'province': new FormControl('British Columbia', [Validators.required, Validators.pattern(this.hasCharactersRegex)]),
				'postalCode': new FormControl('', [Validators.required, Validators.pattern(this.postalCodeRegex), Validators.pattern(this.hasCharactersRegex)]),
			});
		} else {
			this.addressForm = new FormGroup({
				'line1': new FormControl(''),
				'line2': new FormControl(''),
				'city': new FormControl(''),
				'province': new FormControl(''),
				'postalCode': new FormControl('', Validators.pattern(this.postalCodeRegex)),
			});
		}
		// write previous values into address
		if (address) {
			this.addressForm.controls['line1'].setValue(address.line1);
			this.addressForm.controls['line2'].setValue(address.line2);
			this.addressForm.controls['city'].setValue(address.city);
			this.addressForm.controls['province'].setValue(address.province);
			this.addressForm.controls['postalCode'].setValue(address.postalCode);
		}
	}

	onInput() {
		if (this.addressForm.valid) {
			// if valid we write back to the parent
			this.writeValue(this.addressForm.value);
		} else {
			// otherwise we clear the parent so that the parent form knows if this area is valid
			this.writeValue(null);
		}
	}
	// ******************ControlValueAccessor interface stuff below *************************
	writeValue(address: iAddress): void {
		// every time this form control is updated from the parent
		this._onChange(address);
	}
	_onChange = (_: any) => { };
	_onTouched = (_: any) => { };
	registerOnChange(fn: any): void {
		// when we want to let the parent know that the value of the form control should be updated
		this._onChange = fn;
	}
	registerOnTouched(fn: any): void {
		// when we want to let the parent know that the form control has been touched
		this._onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
		// when the parent updates the state of the form control
		this.disabled = isDisabled;
	}
}

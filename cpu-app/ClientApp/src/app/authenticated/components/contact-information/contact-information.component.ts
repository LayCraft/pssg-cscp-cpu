import { Component, OnInit, Input, EventEmitter, Output, OnChanges, forwardRef } from '@angular/core';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { FormControl, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PHONE_NUMBER, EMAIL } from 'src/app/core/constants/regex.constants';
import { FormHelper } from 'src/app/core/form-helper'

@Component({
	selector: 'app-contact-information',
	templateUrl: './contact-information.component.html',
	styleUrls: ['./contact-information.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ContactInformationComponent),
			multi: true,
		}
	]
})
export class ContactInformationComponent implements OnInit, OnChanges {
	@Input() disabled: boolean = false;
	@Input() contactInformation: iContactInformation;
	@Output() contactInformationChange = new EventEmitter<iContactInformation>();

	contactInformationForm: FormGroup;

	// helpers for setting form state
	public formHelper = new FormHelper();

	constructor() { }
	ngOnInit() {
		// instantiate this with existing data if it is supplied.
		this.buildForm(this.contactInformation);
		console.log('contact-information init', this.contactInformation);

	}
	ngOnChanges(changes: any) {
		// if the parent element changes anything reflow the information into the form
		// this.buildForm(changes);
		console.log('contact-information change', changes);
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
		if (contactInformation) {
			// write previous values into address
			this.contactInformationForm.controls['mainAddress'].setValue(contactInformation.mainAddress);
			if (contactInformation.mailingAddress) {
				this.contactInformationForm.controls['hasMailingAddress'].setValue(true); // set the value of the checkbox to true if this is passed in
				this.contactInformationForm.controls['mailingAddress'].setValue(contactInformation.mailingAddress);
			}
			this.contactInformationForm.controls['phoneNumber'].setValue(contactInformation.phoneNumber);
			this.contactInformationForm.controls['faxNumber'].setValue(contactInformation.faxNumber);
		}
	}

	onInput() {
		// only emit the contact information if this form is valid.
		if (this.contactInformationForm.valid) {
			this.writeValue(this.contactInformationForm.value);
		} else {
			this.writeValue(null);
		}
	}
	// ******************ControlValueAccessor interface stuff below *************************
	writeValue(address: iContactInformation): void {
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

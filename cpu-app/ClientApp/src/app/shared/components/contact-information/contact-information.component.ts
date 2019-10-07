import { Component, forwardRef, OnInit, OnDestroy, Input } from '@angular/core';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { FormControl, FormGroup, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PHONE_NUMBER, EMAIL } from 'src/app/core/constants/regex.constants';
import { FormHelper } from 'src/app/core/form-helper'
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

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
export class ContactInformationComponent implements ControlValueAccessor, OnInit, OnDestroy {
	@Input() title: string = 'Primary Contact Information';
	@Input() required: boolean = false;
	private _onChange = (_: any) => { };
	private _onTouched = () => { };
	private onDestroy$: Subject<void> = new Subject();

	private contactInformation: iContactInformation;
	// main form for collecting
	public internalFormGroup: FormGroup;

	constructor() {
		this.buildForm()
	}
	ngOnInit(): void {
		//watch for any value changes in the form
		this.internalFormGroup.valueChanges
			.pipe(
				tap(value => {
					this._onChange(value);
					this._onTouched();
				}),
				takeUntil(this.onDestroy$),
			).subscribe();
	}
	ngOnDestroy(): void {
		// shut this subject down on destroy
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	// helpers for setting form state
	public formHelper = new FormHelper();
	// getters for the template syntax to collect the form fields
	get emailAddress() { return this.internalFormGroup.get('emailAddress') }
	get mainAddress() { return this.internalFormGroup.get('mainAddress') }
	get mailingAddress() { return this.internalFormGroup.get('mailingAddress') }
	get phoneNumber() { return this.internalFormGroup.get('phoneNumber') }
	get faxNumber() { return this.internalFormGroup.get('faxNumber') }
	get hasMailingAddress() { return this.internalFormGroup.get('hasMailingAddress') }


	buildForm() {
		if (this.required) {
			// build the form
			this.internalFormGroup = new FormGroup({
				'emailAddress': new FormControl('', [Validators.required, Validators.pattern(EMAIL)]),
				'mainAddress': new FormControl('', Validators.required),
				'mailingAddress': new FormControl(),
				'phoneNumber': new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER)]),
				'faxNumber': new FormControl('', [Validators.pattern(PHONE_NUMBER)]),
				'hasMailingAddress': new FormControl(false), // we don't care about this. It is untracked
			});
		} else {
			this.internalFormGroup = new FormGroup({
				'emailAddress': new FormControl('', [Validators.pattern(EMAIL)]),
				'mainAddress': new FormControl(''),
				'mailingAddress': new FormControl(),
				'phoneNumber': new FormControl('', [Validators.pattern(PHONE_NUMBER)]),
				'faxNumber': new FormControl('', [Validators.pattern(PHONE_NUMBER)]),
				'hasMailingAddress': new FormControl(false), // we don't care about this. It is untracked
			});
		}
		// fill it with whatever we have if we have it
		if (this.contactInformation) this.setValue();
	}

	setValue() {
		// write the value into the form
		this.internalFormGroup.setValue(this.contactInformation, { emitEvent: false });
	}
	// ******************ControlValueAccessor interface stuff below *************************
	writeValue(contactInformation: iContactInformation): void {
		// every time this form control is updated from the parent
		if (contactInformation) {
			const contactInformationCleaned = {
				emailAddress: contactInformation.emailAddress || '',
				phoneNumber: contactInformation.phoneNumber || '',
				faxNumber: contactInformation.faxNumber || '',
				mainAddress: contactInformation.mainAddress || null,
				mailingAddress: contactInformation.mailingAddress || null,
				hasMailingAddress: contactInformation.mailingAddress ? true : false,
			};
			// save this for later.
			this.contactInformation = contactInformationCleaned;
			this.setValue();
		}
	}

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
		isDisabled ? this.internalFormGroup.disable() : this.internalFormGroup.enable();

	}
}

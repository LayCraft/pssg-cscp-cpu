import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { iAddress } from 'src/app/core/models/address.class';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, Validators } from '@angular/forms';
import { COUNTRIES_ADDRESS_2, iCountry } from 'src/app/core/constants/country-list';
import { POSTAL_CODE, WORD } from 'src/app/core/constants/regex.constants';
import { FormHelper } from 'src/app/core/form-helper';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

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
export class AddressComponent implements ControlValueAccessor, OnInit, OnDestroy {
	@Input() required: boolean = false;

	private _onChange = (_: any) => { };
	private _onTouched = () => { };
	private onDestroy$: Subject<void> = new Subject();

	// main form for collecting
	public internalFormGroup: FormGroup;

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
		this.buildForm();
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
	get line1() { return this.internalFormGroup.get('line1') }
	get line2() { return this.internalFormGroup.get('line2') }
	get city() { return this.internalFormGroup.get('city') }
	get province() { return this.internalFormGroup.get('province') }
	get postalCode() { return this.internalFormGroup.get('postalCode') }

	buildForm() {
		// note this form is missing a country dropdown because i don't need it in the wireframes. The address oobject supports it
		if (this.required) {
			this.internalFormGroup = new FormGroup({
				'line1': new FormControl('', [Validators.required, Validators.pattern(this.hasCharactersRegex)]),
				'line2': new FormControl(''),
				'city': new FormControl('', [Validators.required, Validators.pattern(this.hasCharactersRegex)]),
				'province': new FormControl('British Columbia', [Validators.required, Validators.pattern(this.hasCharactersRegex)]),
				'postalCode': new FormControl('', [Validators.required, Validators.pattern(this.postalCodeRegex), Validators.pattern(this.hasCharactersRegex)]),
			});
		} else {
			this.internalFormGroup = new FormGroup({
				'line1': new FormControl(''),
				'line2': new FormControl(''),
				'city': new FormControl(''),
				'province': new FormControl(''),
				'postalCode': new FormControl('', Validators.pattern(this.postalCodeRegex)),
			});
		}
	}

	// ******************ControlValueAccessor interface stuff below *************************
	writeValue(address: iAddress): void {
		if (address) {
			// every time this form control is updated from the parent
			const addressCleaned = {
				line1: address.line1 || '',
				line2: address.line2 || '',
				city: address.city || '',
				province: address.province || '',
				postalCode: address.postalCode || '',
			};
			this.internalFormGroup.setValue(addressCleaned, { emitEvent: false });
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

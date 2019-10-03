import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson, Person } from 'src/app/core/models/person.class';
import { EMAIL, PHONE_NUMBER } from 'src/app/core/constants/regex.constants';
import { FormHelper } from 'src/app/core/form-helper';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
	selector: 'app-person-editor',
	templateUrl: './person-editor.component.html',
	styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent implements OnInit {
	@Input() person: iPerson;
	@Output() personChange = new EventEmitter<iPerson>();
	emailRegex: RegExp = EMAIL;
	phoneRegex: RegExp = PHONE_NUMBER;
	required = true;
	// helpers for setting form state
	public formHelper = new FormHelper();
	constructor() { }
	internalFormGroup: FormGroup;
	addressFormGroup: FormGroup;
	mailingAddressFormGroup: FormGroup;
	ngOnInit() {
		this.buildForm();
	}
	onChanges() {
		// whenever the form changes this element emits
		this.personChange.emit(this.internalFormGroup.value);
	}
	buildForm() {
		this.internalFormGroup = new FormGroup({
			'typeOfEmployee': new FormControl(),
			'address': new FormControl(),
			'annualSalary': new FormControl(),
			'baseHourlyWage': new FormControl(),
			'benefits': new FormControl(),
			'email': new FormControl(),
			'fax': new FormControl(),
			'firstName': new FormControl(),
			'hoursWorkedPerWeek': new FormControl(),
			'lastName': new FormControl(),
			'middleName': new FormControl(),
			'personId': new FormControl(),
			'phone': new FormControl(),
			'title': new FormControl(),
			'fundedFromVCSP': new FormControl(),
		});
		// set the values into the form
		this.internalFormGroup.setValue(this.person, { emitEvent: false });
	}
}











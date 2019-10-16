import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iPerson } from '../../../core/models/person.class';
import { FormHelper } from '../../../core/form-helper';
import { EMAIL, PHONE_NUMBER } from '../../../core/constants/regex.constants';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent implements OnInit {
  @Input() person: iPerson;
  @Output() personChange = new EventEmitter<iPerson>();
  required = true;
  // helpers for setting form state
  public formHelper = new FormHelper();
  constructor() { }
  internalFormGroup: FormGroup;

  get email() { return this.internalFormGroup.get('email') }
  get phone() { return this.internalFormGroup.get('phone') }
  get fax() { return this.internalFormGroup.get('fax') }

  ngOnInit() {
    this.buildForm();
  }

  onChanges() {
    // whenever the form changes this element emits
    this.personChange.emit(this.internalFormGroup.value);
  }
  buildForm() {
    this.internalFormGroup = new FormGroup({
      'typeOfEmployee': new FormControl(''),
      'address': new FormControl(''),
      'annualSalary': new FormControl(''),
      'baseHourlyWage': new FormControl(''),
      'benefits': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.pattern(EMAIL)]),
      'fax': new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER)]),
      'firstName': new FormControl('', [Validators.required]),
      'hoursWorkedPerWeek': new FormControl(''),
      'lastName': new FormControl('', [Validators.required]),
      'middleName': new FormControl(''),
      'personId': new FormControl(''),
      'phone': new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER)]),
      'title': new FormControl(''),
      'fundedFromVscp': new FormControl(''),
    });
    // set the values into the form
    this.internalFormGroup.setValue(this.person, { emitEvent: false });
  }
}
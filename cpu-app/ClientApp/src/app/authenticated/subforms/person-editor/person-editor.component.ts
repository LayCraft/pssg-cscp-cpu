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
  me: boolean = false;

  get email() { return this.internalFormGroup.get('email'); }
  get fax() { return this.internalFormGroup.get('fax'); }
  get firstName() { return this.internalFormGroup.get('firstName'); }
  get lastName() { return this.internalFormGroup.get('lastName'); }
  get middleName() { return this.internalFormGroup.get('middleName'); }
  get phone() { return this.internalFormGroup.get('phone'); }

  ngOnInit() {
    // determine if the current user is modifying themself
    if (this.person.me) {
      this.me = true;
    }
    this.buildForm();
  }

  onChanges() {
    // whenever the form changes this element emits
    this.personChange.emit(this.internalFormGroup.value);
  }
  buildForm() {
    this.internalFormGroup = new FormGroup({
      'address': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.pattern(EMAIL)]),
      'fax': new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER)]),
      'firstName': new FormControl({ value: '', disabled: this.me }, [Validators.required, Validators.maxLength(50)]),
      'lastName': new FormControl({ value: '', disabled: this.me }, [Validators.required, Validators.maxLength(50)]),
      'middleName': new FormControl(['', Validators.maxLength(50)]),
      'personId': new FormControl(['']),
      'phone': new FormControl([''], [Validators.required, Validators.pattern(PHONE_NUMBER)]),
      'title': new FormControl(['', Validators.maxLength(50)]),
      'deactivated': new FormControl(null),
      'me': new FormControl(null),
    });
    // set the values into the form
    this.internalFormGroup.setValue(this.person, { emitEvent: false });
  }
}

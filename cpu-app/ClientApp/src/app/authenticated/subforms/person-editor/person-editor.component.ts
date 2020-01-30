import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson } from '../../../core/models/person.interface';
import { FormHelper } from '../../../core/form-helper';
import { EMAIL, PHONE_NUMBER, LETTERS_SPACES } from '../../../core/constants/regex.constants';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent implements OnInit {
  @Input() person: iPerson;
  @Output() personChange = new EventEmitter<iPerson>();

  // helpers for setting form state
  public formHelper = new FormHelper();
  me: boolean = false;
  emailRegex: RegExp = EMAIL;
  phoneRegex: RegExp = PHONE_NUMBER;
  wordRegex: RegExp = LETTERS_SPACES;
  constructor() { }

  ngOnInit() {
    // determine if the current user is modifying themself
    if (this.person.me) {
      this.me = true;
    }
  }

  onChanges() {
    // whenever the form changes this element emits
    this.personChange.emit(this.person);
  }
}

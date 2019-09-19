import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { AdministrativeInformation, iAdministrativeInformation } from 'src/app/core/models/administrative-information.class';

@Component({
  selector: 'app-administrative-information',
  templateUrl: './administrative-information.component.html',
  styleUrls: ['./administrative-information.component.scss']
})
export class AdministrativeInformationComponent implements OnInit {
  // a viewchild to check the validity of the template form
  @ViewChild(NgForm, { static: false }) aiForm;
  // input a contact information properties to create this form
  @Input() administrativeInformation: iAdministrativeInformation;
  // output a contact on change
  @Output() administrativeInformationChange = new EventEmitter<AdministrativeInformation>();
  // is the contents of the form valid?
  @Output() valid = new EventEmitter<boolean>();

  // form model
  administrativeInformationForm: AdministrativeInformation;

  constructor() { }

  ngOnInit() {
    // initialize the contact information if it is supplied else make a new object
    this.administrativeInformation ? this.administrativeInformationForm = new AdministrativeInformation(this.administrativeInformation) : new AdministrativeInformation();
    // now that the form is initialized we emit it to send the validity to the parent. Otherwise we have to wait for the user to change something.
    this.onInput();
  }

  // if the supplied information changes reinitialize it into the form
  ngOnChange(change: iAdministrativeInformation) {
    this.administrativeInformationForm = new AdministrativeInformation(change);
    // now that the form is initialized we emit it to send the validity to the parent. Otherwise we have to wait for the user to change something.
    this.onInput();
  }
  // form helpers. Validity hints and hide/show toggles
  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }

  onInput() {
    // is this valid? Emit it boolean
    this.valid.emit(this.aiForm.valid);
    // emit the form
    this.administrativeInformationChange.emit(this.administrativeInformationForm);
  }

  changeStaffUnionized() {
    // if the staff is unionized we show a form
    // if not we remove the information from the form
    if (!this.administrativeInformationForm.staffUnionized) {
      this.administrativeInformationForm.staffUnion = null;
    }
  }
}

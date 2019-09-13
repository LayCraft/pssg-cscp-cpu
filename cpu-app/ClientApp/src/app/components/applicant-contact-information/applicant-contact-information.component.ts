import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { ContactInformation, iContactInformation } from '../../classes/contact-information.class';
import { emailValidRegex, phoneValidRegex, postalCodeValidRegex } from '../../constants/validators';
import { AbstractControl, NgForm } from '@angular/forms';
import { iCountry, COUNTRIES_ADDRESS_2 } from '../../constants/country-list';
import { Address } from '../../classes/address.class';

@Component({
  selector: 'app-applicant-contact-information',
  templateUrl: './applicant-contact-information.component.html',
  styleUrls: ['./applicant-contact-information.component.scss']
})
export class ApplicantContactInformationComponent implements OnInit {
  // a viewchild to check the validity of the template form
  @ViewChild(NgForm) ciForm;
  // input a contact information properties to create this form
  @Input() contactInformation: iContactInformation;
  // output a contact on change
  @Output() contactInformationChange = new EventEmitter<ContactInformation>();
  // is the contents of the form valid?
  @Output() valid = new EventEmitter<boolean>();

  // patterns
  emailValidRegex = emailValidRegex;
  phoneValidRegex = phoneValidRegex;
  postalCodeValidRegex = postalCodeValidRegex;
  // form state
  hasMailingAddress = false;
  country: iCountry;
  // form model
  contactInformationForm: ContactInformation;

  constructor() { }

  ngOnInit() {
    // set country to canada
    this.country = COUNTRIES_ADDRESS_2.Canada;
    // initialize the contact information if it is supplied else make a new object
    this.contactInformation ? this.contactInformationForm = new ContactInformation(this.contactInformation) : new ContactInformation();
    // the mailing address should be shown on init when the contact information is not empty
    this.hasMailingAddress = !!this.contactInformation && !!this.contactInformation.mailingAddress && !!this.contactInformation.mailingAddress.city;

    // now that the form is initialized we emit it to send the validity to the parent. Otherwise we have to wait for the user to change something.
    this.onInput();
  }

  // if the supplied information changes reinitialize it into the form
  ngOnChange(change: iContactInformation) {
    this.contactInformationForm = new ContactInformation(change);
    // now that the form is initialized we emit it to send the validity to the parent. Otherwise we have to wait for the user to change something.
    this.onInput();
  }

  // form helpers. Validity hints and hide/show toggles
  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }
  setMailingAddress(hasMailingAddress: boolean) {
    // if the mailing address is turned off then we clean that part of the model.
    if (!hasMailingAddress) {
      // replace the filled mailing address with a fresh one
      this.contactInformationForm.mailingAddress = new Address();
    }
    // emit the form validity because we have added or removed new fields that require validity checking
    this.valid.emit(this.ciForm.valid);
  }

  onInput() {
    // is this valid? Emit it boolean
    this.valid.emit(this.ciForm.valid);
    // emit the form
    this.contactInformationChange.emit(this.contactInformationForm);
  }
}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ContactInformation, iContactInformation } from '../../classes/contact-information.class';
import { emailValidRegex, phoneValidRegex, postalCodeValidRegex } from '../../constants/validators';
import { AbstractControl } from '@angular/forms';
import { iCountry, COUNTRIES_ADDRESS_2 } from '../../constants/country-list';
import { Address } from '../../classes/address.class';
// import { BoilerplateService } from '../../services/boilerplate.service';

@Component({
  selector: 'app-applicant-contact-information',
  templateUrl: './applicant-contact-information.component.html',
  styleUrls: ['./applicant-contact-information.component.scss']
})
export class ApplicantContactInformationComponent implements OnInit {
  // this would be some kind of object or string we can look up the contact information from an API.
  // @Input() organizationId = null;

  // input a contact information properties to create this form
  @Input() contactInformation: iContactInformation;
  // output a contact on change
  @Output() contactInformationChange = new EventEmitter<ContactInformation>();
  // is the contents of the form valid?
  @Output() valid = new EventEmitter<boolean>();
  // @Output() save = new EventEmitter<iContactInformation>();

  // patterns
  emailValidRegex = emailValidRegex;
  phoneValidRegex = phoneValidRegex;
  postalCodeValidRegex = postalCodeValidRegex;

  // form state
  hasMailingAddress = false;
  country: iCountry;

  // form model
  contactInformationForm: ContactInformation;

  constructor(
    // private boilerplateService: BoilerplateService,
  ) { }

  ngOnInit() {
    this.contactInformationForm = new ContactInformation();
    // set country to canada
    this.country = COUNTRIES_ADDRESS_2.Canada;
    // initialize the contact information
    this.contactInformationForm = new ContactInformation(this.contactInformation);

    // if (this.contactInformation) {
    //   // if the organization ID is passed in then get it from the boilerplate service
    //   this.boilerplateService.getOrganizationBoilerplate(this.organizationId).subscribe((info: iContactInformation) => {
    //     // when the component loads make a new working contact information object to do the form work in
    //     this.contactInformation = new ContactInformation(info);

    //     // TODO: In the future we can convert the dynamics junk data into a useful collection.
    //     // const ci: ContactInformation = new ContactInformation();
    //     // ci.fromDynamics(info);
    //     // this.contactInformation = ci;

    //     // if there is something returned in the mailing address then we should show the section
    //     if (info.mailingAddress) {
    //       this.hasMailingAddress = true;
    //     }
    //   });
    // } else {
    //   // no included organization ID? make a blank form.
    //   this.contactInformation = new ContactInformation();
    // }
  }

  // if the supplied information changes reinitialize it into the form
  ngOnChange(change: iContactInformation) {
    this.contactInformationForm = new ContactInformation(change);
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
  }

  // onSubmit(valid: boolean) {
  //   // if the form is valid we emit.
  //   if (valid) {
  //     this.save.emit(this.contactInformationForm);
  //   } else {
  //     alert('This form is not valid.');
  //   }
  // }

  onChange(valid: boolean) {
    this.valid.emit(valid);
    this.contactInformationChange.emit(this.contactInformationForm);
  }
}

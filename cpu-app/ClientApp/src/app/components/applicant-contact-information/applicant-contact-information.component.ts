import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ContactInformation, iContactInformation } from '../../classes/contact-information.class';
import { emailValidRegex, phoneValidRegex, postalCodeValidRegex } from '../../constants/validators';
import { AbstractControl } from '@angular/forms';
import { iCountry, COUNTRIES_ADDRESS_2 } from '../../constants/country-list';
import { Address } from '../../classes/address.class';
import { BoilerplateService } from '../../services/boilerplate.service';

@Component({
  selector: 'app-applicant-contact-information',
  templateUrl: './applicant-contact-information.component.html',
  styleUrls: ['./applicant-contact-information.component.scss']
})
export class ApplicantContactInformationComponent implements OnInit {
  // this would be some kind of object or string we can look up the contact information from an API.
  @Input() organizationId = null;
  @Output() save = new EventEmitter<iContactInformation>();

  emailValidRegex = emailValidRegex;
  phoneValidRegex = phoneValidRegex;
  postalCodeValidRegex = postalCodeValidRegex;

  // the form object
  contactInformation: ContactInformation;
  hasMailingAddress = false;
  country: iCountry;

  constructor(
    private boilerplateService: BoilerplateService,
  ) { }

  ngOnInit() {
    this.contactInformation = new ContactInformation();
    // set to canada
    this.country = COUNTRIES_ADDRESS_2.Canada;
    this.boilerplateService.getOrganizationBoilerplate(this.organizationId).subscribe((info: iContactInformation) => {
      // when the component loads make a new working contact information object to do the form work in
      this.contactInformation = new ContactInformation(info);

      // TODO: In the future we can convert the dynamics junk data into a useful collection.
      // const ci: ContactInformation = new ContactInformation();
      // ci.fromDynamics(info);
      // this.contactInformation = ci;

      // if there is something returned in the mailing address then we should show the section
      if (info.mailingAddress) {
        this.hasMailingAddress = true;
      }
    });
  }

  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }
  setMailingAddress(hasMailingAddress: boolean) {
    if (!hasMailingAddress) {
      // replace the filled mailing address with a fresh one
      this.contactInformation.mailingAddress = new Address();
    }
  }

  onSubmit(valid: boolean) {
    // if the form is valid we emit.
    if (valid) {
      this.save.emit(this.contactInformation);
    } else {
      alert('This form is not valid.');
    }
  }
}

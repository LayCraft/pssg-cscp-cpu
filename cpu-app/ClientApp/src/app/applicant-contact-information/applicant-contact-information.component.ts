import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ContactInformation, iContactInformation } from '../classes/contact-information.class';
import { RenewApplicationService } from '../services/renew-application.service';
import { ApplicantInfoService } from '../services/applicant-info.service';
import { emailValidRegex, phoneValidRegex, postalCodeValidRegex } from '../constants/validators';
import { AbstractControl } from '@angular/forms';
import { iCountry, COUNTRIES_ADDRESS_2 } from '../constants/country-list';
import { Address } from '../classes/address.class';

@Component({
  selector: 'app-applicant-contact-information',
  templateUrl: './applicant-contact-information.component.html',
  styleUrls: ['./applicant-contact-information.component.scss']
})
export class ApplicantContactInformationComponent implements OnInit {
  // this would be some kind of object or string we can look up the contact information from an API.
  @Input() contactInformationLookupId = null;
  @Output() pageTurn = new EventEmitter<string>();

  emailValidRegex = emailValidRegex;
  phoneValidRegex = phoneValidRegex;
  postalCodeValidRegex = postalCodeValidRegex;

  // the form object
  contactInformation: ContactInformation;
  hasMailingAddress = false;
  country: iCountry;

  constructor(
    private renewApplicationService: RenewApplicationService,
    private applicantInfoService: ApplicantInfoService,
  ) { }

  ngOnInit() {
    this.contactInformation = new ContactInformation();
    // set to canada
    this.country = COUNTRIES_ADDRESS_2.Canada;
    this.applicantInfoService.getApplicantContactInfo().subscribe((info: iContactInformation) => {
      // when the component loads make a new working contact information object to do the form work in
      this.contactInformation = new ContactInformation(info);
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
  onSubmit() {
    // submit data
    this.renewApplicationService.submitContactInformation(this.contactInformation).subscribe(
      data => {
        // log the data. The submission was successful and now this prints in the browser console.
        console.log(data);
        // // request a page turn from the parent
        this.pageTurn.emit('applicant-contact-information turned the page!');
      },
      err => {
        // oops an error
        console.log(`There was an error submitting the contact information.`);
        console.log(err);

        // TODO: turn the page anyhow even though the API isn't fully baked. Get rid of this
        this.pageTurn.emit('applicant-contact-information turned the page!');
      },
    )
  }
}

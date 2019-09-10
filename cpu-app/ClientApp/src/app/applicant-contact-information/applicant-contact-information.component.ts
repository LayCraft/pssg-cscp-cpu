import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ContactInformation, iContactInformation } from '../classes/contact-information.class';
import { RenewApplicationService } from '../services/renew-application.service';
import { emailValidRegex, phoneValidRegex, postalCodeValidRegex } from '../constants/validators';
import { AbstractControl } from '@angular/forms';
import { iCountry, COUNTRIES_ADDRESS_2 } from '../constants/country-list';
import { Address } from '../classes/address.class';
import { BoilerplateService } from '../services/boilerplate.service';

@Component({
  selector: 'app-applicant-contact-information',
  templateUrl: './applicant-contact-information.component.html',
  styleUrls: ['./applicant-contact-information.component.scss']
})
export class ApplicantContactInformationComponent implements OnInit {
  // this would be some kind of object or string we can look up the contact information from an API.
  @Input() contractId = null;
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
    private boilerplateService: BoilerplateService,
  ) { }

  ngOnInit() {
    this.contactInformation = new ContactInformation();
    // set to canada
    this.country = COUNTRIES_ADDRESS_2.Canada;
    this.boilerplateService.getOrganizationBoilerplate('bceid goes here').subscribe((info: iContactInformation) => {
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

  onSubmit() {
    // if a record exists and we are updating we should use a different service call than on a new creation
    // submit data
    this.renewApplicationService.submitContactInformation(this.contactInformation).subscribe(
      data => {
        // log the data. The submission was successful and now this prints in the browser console.
        console.log(data);

        // request a page turn from the parent
        this.pageTurn.emit('applicant-contact-information turned the page!');
      },
      err => {
        // oops an error
        console.log(`There was an error submitting the contact information.`);
        console.log(err);

        // turn the component's page
        // TODO: turn the page anyhow even though the API isn't fully baked. Get rid of this
        this.pageTurn.emit('applicant-contact-information turned the page!');
      },
    )
  }
}

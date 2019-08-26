import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ContactInformation } from '../interfaces/contact-information.class';
import { RenewApplicationService } from '../services/renew-application.service';

@Component({
  selector: 'app-applicant-contact-information',
  templateUrl: './applicant-contact-information.component.html',
  styleUrls: ['./applicant-contact-information.component.scss']
})
export class ApplicantContactInformationComponent implements OnInit {
  // this would be some kind of object or string we can look up the contact information from an API.
  @Input() contactInformationLookupId = null;
  @Output() pageTurn = new EventEmitter<string>();

  emailValidRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // the form object
  contactInformation: ContactInformation;
  constructor(
    private renewApplicationService: RenewApplicationService
  ) { }

  ngOnInit() {
    // when the component loads make a new working contact information object to do the form work in
    this.contactInformation = new ContactInformation();
    // this should be a service call
    this.contactInformation.contractNumber = '19052-FY-20';
    this.contactInformation.organizationName = 'BC Social Work Societies';
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

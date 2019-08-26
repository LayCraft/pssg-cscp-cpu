import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ContactInformation, iContactInformation } from '../classes/contact-information.class';
import { RenewApplicationService } from '../services/renew-application.service';
import { ApplicantInfoService } from '../services/applicant-info.service';
import { emailValidRegex } from '../constants/validators';

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

  // the form object
  contactInformation: ContactInformation;
  constructor(
    private renewApplicationService: RenewApplicationService,
    private applicantInfoService: ApplicantInfoService,
  ) { }

  ngOnInit() {
    this.contactInformation = new ContactInformation();

    // this should be a service call
    this.applicantInfoService.getApplicantContactInfo().subscribe((info: iContactInformation) => {
      // when the component loads make a new working contact information object to do the form work in
      this.contactInformation = new ContactInformation(info);
    });
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

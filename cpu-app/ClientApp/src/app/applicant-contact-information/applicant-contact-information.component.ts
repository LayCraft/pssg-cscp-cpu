import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { iContactInformation } from '../interfaces/contact-information.interface';
import { ContactInformation } from '../interfaces/contact-information.class';

@Component({
  selector: 'app-applicant-contact-information',
  templateUrl: './applicant-contact-information.component.html',
  styleUrls: ['./applicant-contact-information.component.scss']
})
export class ApplicantContactInformationComponent implements OnInit {
  // this would be some kind of object or string we can look up the contact information from an API.
  @Input() contactInformationLookupId = null;

  emailValidRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // the form object
  contactInformation: ContactInformation;
  constructor() { }

  ngOnInit() {
    // when the component loads make a new working contact information object to do the form work in
    this.contactInformation = new ContactInformation();
    // this should be a service call
    this.contactInformation.contractNumber = '19052-FY-20';
    this.contactInformation.organizationName = 'BC Social Work Societies';
  }
  onSubmit() {
    // submit data
    alert('Form appears valid and would submit if attached to the backend.');
  }
}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { iContactInformation } from '../interfaces/contact-information.interface';

@Component({
  selector: 'app-applicant-contact-information',
  templateUrl: './applicant-contact-information.component.html',
  styleUrls: ['./applicant-contact-information.component.css']
})
export class ApplicantContactInformationComponent implements OnInit {
  @Output() contactInformationChange = new EventEmitter<iContactInformation>();
  @Input() contactInformation = null;

  constructor() { }

  ngOnInit() {
  }
  propagateModelChange(): void {
    this.contactInformationChange.emit({
      organizationName: 'BC Social Work Societies',
      contractNumber: '19052-FY20',
      emailAddress: 'socialwork@quartech.com',
    });
  }
}

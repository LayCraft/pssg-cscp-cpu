import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iContactInformation } from '../interfaces/contact-information.interface';
import { ProgramInformation } from '../interfaces/program-information.class';
import { ApplicantInfoService } from '../services/applicant-info.service';
import { Address } from '../interfaces/address.class';
import { Person } from '../interfaces/person.class';
@Component({
  selector: 'app-program-planner',
  templateUrl: './program-planner.component.html',
  styleUrls: ['./program-planner.component.scss']
})
export class ProgramPlannerComponent implements OnInit {
  @Input() program: string;
  @Output() pageTurn = new EventEmitter<string>();

  // the form object
  programInfo: ProgramInformation;
  constructor(
    private applicantInfoService: ApplicantInfoService
  ) { }

  ngOnInit() {
    // query the api for an existing record return a 204 of not found?
    //if 204 query applicant info service to fill in boilerplate data
    this.applicantInfoService.getApplicantContactInfo().subscribe((info: iContactInformation) => {
      // when the component loads make a new working contact information object to do the form work in
      this.programInfo = new ProgramInformation();

      // copy the shared properties
      this.programInfo.organizationName = info.organizationName || null;
      this.programInfo.contractNumber = info.contractNumber || null;
      this.programInfo.emailAddress = info.emailAddress || null;
      this.programInfo.phoneNumber = info.phoneNumber || null;
      this.programInfo.faxNumber = info.faxNumber || null;

      this.programInfo.mainAddress = new Address(info.mainAddress);
      this.programInfo.mailingAddress = new Address(info.mailingAddress);
    });
  }
  onSubmit() {
    this.pageTurn.emit('The program planner component requested a page turn.');
  }
}

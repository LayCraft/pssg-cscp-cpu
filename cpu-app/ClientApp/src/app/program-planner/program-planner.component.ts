import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramInformation } from '../classes/program-information.class';
import { Address } from '../classes/address.class';
import { iContactInformation } from '../classes/contact-information.class';
import { BoilerplateService } from '../services/boilerplate.service';
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

    private boilerplateService: BoilerplateService
  ) { }

  ngOnInit() {
    // query the api for an existing record return a 204 of not found?
    //if 204 query applicant info service to fill in boilerplate data
    this.boilerplateService.getOrganizationBoilerplate('bceid goes here').subscribe((info: iContactInformation) => {
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material';
import { iContactInformation } from '../../classes/contact-information.class';
import { BoilerplateService } from '../../services/boilerplate.service';

@Component({
  selector: 'app-program-page',
  templateUrl: './program-page.component.html',
  styleUrls: ['./program-page.component.scss']
})
export class ProgramPageComponent implements OnInit {
  contractId: string;
  organizationId: string;
  currentPage: string = '';
  pageList: string[];

  upperItems: string[] = ['Overview',
    'Applicant Contact Information',
    'Executive Contact Information',
    'Applicant Administrative Information',
    'Commercial General Liability Insurance'
  ];
  programs: string[] = ['Social Work East Van', 'Social Work Tri-cities', 'Social Work Burnaby', 'Social Work New West'];
  lowerItems: string[] = ['Review Program Application', 'Authorization'];
  combinedPageList: string[];

  currentFormPage: string = '';

  contactInformation: iContactInformation;

  constructor(
    private route: ActivatedRoute,
    private boilerplateService: BoilerplateService,
  ) { }

  ngOnInit() {
    // collect the ids for looking up the program from the route.
    this.organizationId = this.route.snapshot.paramMap.get('orgid');
    this.contractId = this.route.snapshot.paramMap.get('id');

    this.combinedPageList = [...this.upperItems, ...this.programs, ...this.lowerItems];
    this.currentFormPage = this.combinedPageList[0];

    // get the boilerplate contact information if there is none included (resuming the forms.)
    // TODO: eventually we need to get the current forms from the service
    if (!this.contactInformation) this.boilerplateService.getOrganizationBoilerplate(this.organizationId)
      .subscribe(ci => this.contactInformation = ci);
  }

  gotoPage(selectPage: MatStepper): void {
    window.scroll(0, 0);
    this.currentFormPage = this.combinedPageList[selectPage.selectedIndex];
  }
  cancel() { }
  showSummaryOfBenefits() { }
  gotoNextStep(event?) {
    // this just sends the user along to the next page.
    console.log(event)
  }

  saveContactInfo(event?: iContactInformation) {
    // when the user confirms the contact info we save it as partial data.
    console.log(event);
  }
}

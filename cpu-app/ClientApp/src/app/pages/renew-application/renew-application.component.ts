import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { iContactInformation } from '../../classes/contact-information.class';

@Component({
  selector: 'app-renew-application',
  templateUrl: './renew-application.component.html',
  styleUrls: ['./renew-application.component.scss'],
  providers: [],
})

export class RenewApplicationComponent implements OnInit {

  // TODO: This renew application form is the old version that we made

  bceid: string = 'bceid goes here';
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

  constructor() { }
  ngOnInit() {
    this.combinedPageList = [...this.upperItems, ...this.programs, ...this.lowerItems];
    this.currentFormPage = this.combinedPageList[0];
  }

  gotoPage(selectPage: MatStepper): void {
    window.scroll(0, 0);
    this.currentFormPage = this.combinedPageList[selectPage.selectedIndex];
  }
  cancel() { }
  showSummaryOfBenefits() { }
  gotoNextStep(event?: iContactInformation) {
    //if this is handling an event we allow an optional parameter
  }
}

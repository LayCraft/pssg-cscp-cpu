import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { iContactInformation } from '../interfaces/contact-information.interface';

export const postalRegex = '(^\\d{5}([\-]\\d{4})?$)|(^[A-Za-z][0-9][A-Za-z]\\s?[0-9][A-Za-z][0-9]$)';

@Component({
  selector: 'app-renew-application',
  templateUrl: './renew-application.component.html',
  styleUrls: ['./renew-application.component.scss'],
  providers: [],
})

export class RenewApplicationComponent implements OnInit {
  upperItems: string[] = ['Overview',
    'Applicant Contact Information',
    'Applicant Administrative Information',
    'Commercial General Liability Insurance'
  ];
  programs: string[] = ['Social Work East Van', 'Social Work Tri-cities', 'Social Work Burnaby', 'Social Work New West', 'Bork program'];
  lowerItems: string[] = ['Review Program Application', 'Authorization'];
  combinedPageList: string[];

  currentFormPage: string = '';


  contactInformation: iContactInformation = {
    organizationName: 'BC Social Work Societies',
    contractNumber: '19052-FY20',
    emailAddress: '',
  };

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
  gotoNextStep() { }
}

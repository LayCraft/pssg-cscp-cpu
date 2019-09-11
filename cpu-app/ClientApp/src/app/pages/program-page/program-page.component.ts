import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material';
import { iContactInformation } from '../../classes/contact-information.class';

@Component({
  selector: 'app-program-page',
  templateUrl: './program-page.component.html',
  styleUrls: ['./program-page.component.scss']
})
export class ProgramPageComponent implements OnInit {
  programId: string;
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


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // collect the ids for looking up the program from the route.
    this.organizationId = this.route.snapshot.paramMap.get('orgid');
    this.programId = this.route.snapshot.paramMap.get('id');

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

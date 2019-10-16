import { Component, OnInit } from '@angular/core';
import { iProgramTombstone, iTombstone } from '../../core/models/tombstone.class';
import { iContactInformation } from '../../core/models/contact-information.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  contactInformation: iContactInformation;
  tombstones: iTombstone[];
  completedTombstones: iTombstone[];
  programTombstones: iProgramTombstone[];

  tabs: string[];
  currentTab: string;
  statuses: string[];
  formTypes: string[];

  constructor(
    // private tombstoneService: TombstoneService,
    // private boilerplateService: BoilerplateService,
  ) {
    this.tabs = ['Current Tasks', 'Completed', 'Programs'];
    this.currentTab = this.tabs[0];
    this.statuses = ['Missed', 'Late', 'Submitted', 'Started', 'Action Required', 'Complete'];
    this.formTypes = ['program_application', 'budget_proposal', 'status_report', 'expense_report'];
  }

  ngOnInit() {
    // collect BCEIDs for the organization
    // this.boilerplateService.getOrganizationBoilerplate('FAKE BCEID').subscribe(bp => this.contactInformation = bp);
    // this.tombstoneService.getTombstones('FAKE BCEID').subscribe(t => {
    // 	this.tombstones = t.filter(tombstone => tombstone.formStatus !== this.statuses[5]);
    // 	this.completedTombstones = t.filter(tombstone => tombstone.formStatus === this.statuses[5]);
    // });
    // this.tombstoneService.getProgramTombstones('Whatever').subscribe((tombstones: ProgramTombstone[]) => {
    // 	// clear tombstones
    // 	this.programTombstones = tombstones;
    // });
  }
  setCurrentTab(tabname: string) {
    this.currentTab = tabname;
  }
}

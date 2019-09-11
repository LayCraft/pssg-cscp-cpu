import { Component, OnInit } from '@angular/core';
import { iContactInformation } from '../../classes/contact-information.class';
import { iTombstone, iProgramTombstone, ProgramTombstone } from '../../classes/tombstone.class';
import { TombstoneService } from '../../services/tombstone.service';
import { BoilerplateService } from '../../services/boilerplate.service';
import { DynamicsBlob } from '../../classes/dynamics-blob';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  contactInformation: iContactInformation;
  tombstones: iTombstone[];
  completedTombstones: iTombstone[];
  programTombstones: iProgramTombstone[];

  tabs: string[];
  currentTab: string;
  statuses: string[];
  formTypes: string[];

  constructor(
    private tombstoneService: TombstoneService,
    private boilerplateService: BoilerplateService,
  ) {
    this.tabs = ['Current Tasks', 'Completed', 'Programs'];
    this.currentTab = this.tabs[0];
    this.statuses = ['Missed', 'Late', 'Submitted', 'Started', 'Action Required', 'Complete'];
    this.formTypes = ['program_application', 'budget_proposal', 'status_report', 'expense_report'];
  }

  ngOnInit() {
    // collect BCEIDs for the organization
    this.boilerplateService.getOrganizationBoilerplate('FAKE BCEID').subscribe(bp => this.contactInformation = bp);
    this.tombstoneService.getTombstones('FAKE BCEID').subscribe(t => {
      this.tombstones = t.filter(tombstone => tombstone.formStatus !== this.statuses[5]);
      this.completedTombstones = t.filter(tombstone => tombstone.formStatus === this.statuses[5]);
    });
    this.tombstoneService.getProgramTombstones('Whatever').subscribe((dynamics: DynamicsBlob) => {
      // clear tombstones
      this.programTombstones = [];
      for (let key in dynamics) {
        const converter: ProgramTombstone = new ProgramTombstone();
        converter.fromDynamics(dynamics[key]);
        this.programTombstones.push(converter);
      }
    });
  }
  setCurrentTab(tabname: string) {
    this.currentTab = tabname;
  }
}

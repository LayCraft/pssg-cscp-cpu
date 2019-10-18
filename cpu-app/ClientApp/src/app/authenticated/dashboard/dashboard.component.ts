import { Component, OnInit } from '@angular/core';
import { iProgramTombstone, iTombstone, ProgramTombstone } from '../../core/models/tombstone.class';
import { iContactInformation } from '../../core/models/contact-information.class';
import { TombstoneService } from '../../core/services/tombstone.service';
import { StateService } from '../../core/services/state.service';
import { MainService } from '../../core/services/main.service';
import { Transmogrifier, iDynamicsBlob } from '../../core/models/transmogrifier.class';
import { iOrganizationMeta } from '../../core/models/organization-meta.class';

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
  organizationMeta: iOrganizationMeta;

  tabs: string[];
  currentTab: string;
  statuses: string[];
  formTypes: string[];

  constructor(
    private tombstoneService: TombstoneService,
    private stateService: StateService,
    private mainService: MainService,
  ) {
    this.tabs = ['Current Tasks', 'Completed', 'Programs'];
    this.currentTab = this.tabs[0];
    this.statuses = ['Missed', 'Late', 'Submitted', 'Started', 'Action Required', 'Complete'];
    this.formTypes = ['program_application', 'budget_proposal', 'status_report', 'expense_report'];
  }

  ngOnInit() {
    // collect the main blob from dynamics and load it into the state
    this.mainService.getBlob().subscribe((b: iDynamicsBlob) => {
      // transmgrify the data into something useful
      const trans = new Transmogrifier(b);
      // make a useful object for the template
      this.organizationMeta = trans.organizationMeta;
      this.stateService.main.next(trans);

    });

    this.tombstoneService.getTombstones('FAKE BCEID').subscribe(t => {
      this.tombstones = t.filter(tombstone => tombstone.formStatus !== this.statuses[5]);
      this.completedTombstones = t.filter(tombstone => tombstone.formStatus === this.statuses[5]);
    });
    this.tombstoneService.getProgramTombstones('Whatever').subscribe((tombstones: ProgramTombstone[]) => {
      // clear tombstones
      this.programTombstones = tombstones;
    });

    this.stateService.main.subscribe()
  }
  setCurrentTab(tabname: string) {
    this.currentTab = tabname;
  }
}

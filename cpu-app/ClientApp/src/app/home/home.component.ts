import { Component, OnInit } from '@angular/core';
import { iTombstone, iProgramTombstone, Tombstone, ProgramTombstone } from '../classes/tombstone.class';
import { TombstoneService } from '../services/tombstone.service';
import { iContactInformation } from '../classes/contact-information.class';
import { BoilerplateService } from '../services/boilerplate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contactInformation: iContactInformation;
  tombstones: iTombstone[];
  programTombstones: iProgramTombstone[];

  tabs: string[];
  currentTab: string;
  statuses: string[];

  constructor(
    private tombstoneService: TombstoneService,
    private boilerplateService: BoilerplateService,
  ) {
    this.tabs = ['Current Tasks', 'Programs'];
    this.currentTab = this.tabs[0];
    this.statuses = ['Missed', 'Late', 'Submitted', 'Started', 'Action Required'];

  }

  ngOnInit() {
    // collect BCEIDs for the organization
    this.boilerplateService.getOrganizationBoilerplate('FAKE BCEID').subscribe(bp => this.contactInformation = bp);
    this.tombstoneService.getTombstones('FAKE BCEID').subscribe(t => this.tombstones = t);
    this.tombstoneService.getProgramTombstones('Whatever').subscribe((tombstones: iProgramTombstone[]) => {
      // clear tombstones
      this.programTombstones = tombstones;
    });
  }
  setCurrentTab(tabname: string) {
    this.currentTab = tabname;
  }
}

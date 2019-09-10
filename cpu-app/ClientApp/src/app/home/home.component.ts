import { Component, OnInit } from '@angular/core';
import { iTombstone, iProgramTombstone, Tombstone, ProgramTombstone } from '../classes/tombstone.class';
import { TombstoneService } from '../services/tombstone.service';
import { iContactInformation } from '../classes/contact-information.class';
import { BoilerplateService } from '../services/boilerplate.service';
import { DynamicsBlob } from '../classes/dynamics-blob';
import { iProgramInformation } from '../classes/program-information.class';

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
    this.tabs = ['Current Tasks', 'Completed', 'Programs'];
    this.currentTab = this.tabs[0];
    this.statuses = ['Missed', 'Late', 'Submitted', 'Started', 'Action Required'];

  }

  ngOnInit() {
    // collect BCEIDs for the organization
    this.boilerplateService.getOrganizationBoilerplate('FAKE BCEID').subscribe(bp => this.contactInformation = bp);
    this.tombstoneService.getTombstones('FAKE BCEID').subscribe(t => this.tombstones = t);
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

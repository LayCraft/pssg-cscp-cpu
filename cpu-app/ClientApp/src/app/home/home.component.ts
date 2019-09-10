import { Component, OnInit } from '@angular/core';
import { iTombstone } from '../classes/tombstone.class';
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

  constructor(
    private tombstoneService: TombstoneService,
    private boilerplateService: BoilerplateService,
  ) { }

  ngOnInit() {
    // collect BCEIDs for the organization
    this.boilerplateService.getOrganizationBoilerplate('FAKE BCEID').subscribe(bp => this.contactInformation = bp);
    this.tombstoneService.getTombstones('FAKE BCEID').subscribe(t => this.tombstones = t);
  }
}

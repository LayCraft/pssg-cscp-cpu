import { Component, OnInit } from '@angular/core';
import { iTombstone } from '../classes/tombstone.class';
import { TombstoneService } from '../services/tombstone.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tombstones: iTombstone[];

  constructor(
    private tombstoneService: TombstoneService
  ) { }

  ngOnInit() {
    // collect BCEIDs for the organization
    this.tombstoneService.getTombstones('FAKE BCEID').subscribe(t => this.tombstones = t);
  }
}

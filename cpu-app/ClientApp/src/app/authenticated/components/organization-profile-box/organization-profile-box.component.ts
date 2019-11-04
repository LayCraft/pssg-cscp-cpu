import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';

@Component({
  selector: 'app-organization-profile-box',
  templateUrl: './organization-profile-box.component.html',
  styleUrls: ['./organization-profile-box.component.scss']
})
export class OrganizationProfileBoxComponent implements OnInit {
  trans: Transmogrifier;
  constructor(
    private stateService: StateService
  ) { }
  ngOnInit() {
    this.stateService.main.subscribe(o => {
      // collect the organization meta information to show in the box.
      this.trans = o;
    });
  }
}

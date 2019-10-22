import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { iOrganizationMeta } from '../../core/models/organization-meta.class';
import { iContract } from '../../core/models/contract';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  organizationMeta: iOrganizationMeta;
  contracts: iContract[];

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.stateService.main.subscribe(m => {
      // save the organization meta
      this.organizationMeta = m.organizationMeta;
      // save the contracts
      this.contracts = m.contracts;
    });
  }
}

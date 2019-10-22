import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { iOrganizationMeta } from '../../core/models/organization-meta.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  organizationMeta: iOrganizationMeta;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    // save the organization meta
    this.stateService.main.subscribe(m => {
      this.organizationMeta = m.organizationMeta;
    });
  }
}

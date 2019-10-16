import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-profile-box',
  templateUrl: './organization-profile-box.component.html',
  styleUrls: ['./organization-profile-box.component.scss']
})
export class OrganizationProfileBoxComponent implements OnInit {
  organizationMeta = {
    organizationName: 'BC Social',
    contracts: ['179898-asa', '1230941-qux'],
    organizationId: '32989678532',
    phoneNumber: '1 250 555 1212',
    emailAddress: 'Kate@soc.gov.bc.ca'
  };
  constructor() { }
  ngOnInit() { }
}

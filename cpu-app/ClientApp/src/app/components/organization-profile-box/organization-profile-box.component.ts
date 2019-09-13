import { Component, OnInit, Input } from '@angular/core';
import { iContactInformation } from '../../classes/contact-information.class';

@Component({
  selector: 'app-organization-profile-box',
  templateUrl: './organization-profile-box.component.html',
  styleUrls: ['./organization-profile-box.component.scss']
})
export class OrganizationProfileBoxComponent implements OnInit {
  @Input() contactInformation: iContactInformation;
  constructor() { }

  ngOnInit() {

  }

}

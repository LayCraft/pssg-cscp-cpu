import { Component, OnInit, Input } from '@angular/core';
import { iContactInformation } from 'src/app/core/models/contact-information.class';

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

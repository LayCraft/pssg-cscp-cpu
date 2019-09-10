import { Component, OnInit } from '@angular/core';
import { iContactInformation } from '../classes/contact-information.class';

@Component({
  selector: 'app-organization-profile-maker',
  templateUrl: './organization-profile-maker.component.html',
  styleUrls: ['./organization-profile-maker.component.css']
})
export class OrganizationProfileMakerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onPageTurn(event: iContactInformation) {
    alert(event);
  }
}

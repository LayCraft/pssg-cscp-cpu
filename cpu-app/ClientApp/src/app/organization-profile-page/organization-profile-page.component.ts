import { Component, OnInit } from '@angular/core';
import { iContactInformation } from '../classes/contact-information.class';
import { Router } from '@angular/router';
import { BoilerplateService } from '../services/boilerplate.service';

@Component({
  selector: 'app-organization-profile-page',
  templateUrl: './organization-profile-page.component.html',
  styleUrls: ['./organization-profile-page.component.css']
})
export class OrganizationProfilePageComponent implements OnInit {
  bceid: string = 'bceid goes here';

  constructor(
    private boilerplateService: BoilerplateService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onPageTurn(event: iContactInformation) {
    this.boilerplateService.setOrganizationBoilerplate(this.bceid, event).subscribe(
      res => this.router.navigate(['']),
      err => {
        alert('An error has occured. Please try submitting again.');
        console.log(err);
      }
    );
  }
}

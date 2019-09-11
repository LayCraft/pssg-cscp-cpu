import { Component, OnInit } from '@angular/core';
import { iContactInformation } from '../../classes/contact-information.class';
import { Router } from '@angular/router';
import { BoilerplateService } from '../../services/boilerplate.service';

@Component({
  selector: 'app-organization-profile-page',
  templateUrl: './organization-profile-page.component.html',
  styleUrls: ['./organization-profile-page.component.css']
})
export class OrganizationProfilePageComponent implements OnInit {
  organizationId: string = 'bceid goes here';

  constructor(
    private boilerplateService: BoilerplateService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onSave(event: iContactInformation) {
    this.boilerplateService.setOrganizationBoilerplate(this.organizationId, event).subscribe(
      res => this.router.navigate(['/dashboard']),
      err => {
        alert('An error has occured. Please try submitting again.');
        console.log(err);
      }
    );
  }
}

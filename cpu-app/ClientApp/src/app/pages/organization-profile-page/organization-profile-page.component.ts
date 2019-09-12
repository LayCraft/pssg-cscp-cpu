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
  contactInformation: iContactInformation;
  validContactInformation: boolean = false;

  constructor(
    private boilerplateService: BoilerplateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.boilerplateService.getOrganizationBoilerplate(this.organizationId)
      .subscribe(ci => {
        // save the boilerplate information into a place that we can edit it
        this.contactInformation = ci;
      });
  }
  onSave() {
    this.boilerplateService.setOrganizationBoilerplate(this.organizationId, this.contactInformation).subscribe(
      res => this.router.navigate(['/dashboard']),
      err => {
        alert('An error has occured. Please try submitting again.');
        console.log(err);
      }
    );
  }
  onValid(valid: boolean) {
    // set the validity to enable form controls
    this.validContactInformation = valid;
  }
}

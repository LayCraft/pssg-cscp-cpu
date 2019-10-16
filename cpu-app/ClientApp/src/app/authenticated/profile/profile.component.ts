import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { iContactInformation } from '../../core/models/contact-information.class';
import { BoilerplateService } from '../../core/services/boilerplate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // TODO: collect this from the route
  organizationId: string = 'bceid goes here';
  contactInformationForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boilerplateService: BoilerplateService,
  ) { }

  ngOnInit() {
    this.route.snapshot.paramMap.get('organizationId');
    this.boilerplateService.getOrganizationBoilerplate(this.organizationId).subscribe(ci => {
      this.contactInformationForm = new FormGroup({
        'contactInformation': new FormControl('', Validators.required)
      });
      this.contactInformationForm.controls['contactInformation'].setValue(ci);
    });
  }
  hasCriticalParts(): boolean {
    // TODO: this isn't the place to get the validity of the form overall but I want a cheat for the required info
    const c = this.contactInformationForm.value.contactInformation as iContactInformation;
    return !!c.emailAddress && !!c.phoneNumber && !!c.mainAddress.line1 && !!c.mainAddress.city && !!c.mainAddress.province && !!c.mainAddress.postalCode;
  }
  onSave(): void {
    this.boilerplateService.setOrganizationBoilerplate(this.organizationId, this.contactInformationForm.value.contactInformation).subscribe(
      res => {
        this.router.navigate(['/authenticated/dashboard']);
      },
      err => {
        alert('An error has occured. Please try submitting again.');
        console.log(err);
      }
    );
  }
}

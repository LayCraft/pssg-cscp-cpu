import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iContactInformation } from '../../core/models/contact-information.class';
import { StateService } from '../../core/services/state.service';
import { iPerson, Person } from '../../core/models/person.class';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  contactInformationForm: FormGroup;
  executiveContact: iPerson;
  constructor(
    private router: Router,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    // subscribe to main
    this.stateService.main.subscribe(m => {
      this.contactInformationForm = new FormGroup({
        'contactInformation': new FormControl('', Validators.required)
      });
      // console.log(m.organizationMeta.contactInformation);
      this.contactInformationForm.controls['contactInformation'].setValue(m.organizationMeta.contactInformation);
      this.executiveContact = m.organizationMeta.contactInformation.executiveContact;
    });
  }
  hasCriticalParts(): boolean {
    // TODO: this isn't the place to get the validity of the form overall but I want a cheat for the required info
    const c = this.contactInformationForm.value.contactInformation as iContactInformation;
    return !!c.emailAddress && !!c.phoneNumber && !!c.mainAddress.line1 && !!c.mainAddress.city && !!c.mainAddress.province && !!c.mainAddress.postalCode;
  }
  onSave(): void {
    // assemble the contact with executive and
    const formValue: iContactInformation = this.contactInformationForm.value.contactInformation;
    formValue.executiveContact = this.executiveContact;
    console.log(formValue);
    this.router.navigate(['/authenticated/dashboard']);
  }
  onExecutiveContactChange(event: iPerson) {
    // cast the personish object to a person
    this.executiveContact = event;
  }
}

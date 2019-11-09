import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iContactInformation, ContactInformation } from '../../core/models/contact-information.class';
import { StateService } from '../../core/services/state.service';
import { iPerson } from '../../core/models/person.class';
import { iDynamicsPostOrg } from '../../core/models/dynamics-post';
import { ProfileService } from '../../core/services/profile.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';

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
    private profileService: ProfileService,
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
    // cast the data into something useful for dynamics
    const dynamicsPost: iDynamicsPostOrg = {
      "BCeID": this.stateService.bceid.getValue(),
      "Organization": {
        _vsd_boardcontactid_value: formValue.boardContact ? formValue.boardContact.personId : null,
        _vsd_executivecontactid_value: formValue.executiveContact ? formValue.executiveContact.personId : null,
        accountid: this.stateService.organizationId.getValue() || null,
        address1_city: formValue.mainAddress.city || null,
        address1_line1: formValue.mainAddress.line1 || null,
        address1_line2: formValue.mainAddress.line2 || null,
        address1_postalcode: formValue.mainAddress.postalCode || null,
        address1_stateorprovince: formValue.mainAddress.province || null,
        address2_city: formValue.mailingAddress.city || null,
        address2_line1: formValue.mailingAddress.line1 || null,
        address2_line2: formValue.mailingAddress.line2 || null,
        address2_postalcode: formValue.mailingAddress.postalCode || null,
        address2_stateorprovince: formValue.mailingAddress.province || null,
        emailaddress1: formValue.emailAddress || null,
        fax: formValue.faxNumber || null,
        telephone1: formValue.phoneNumber || null,
      }
    };

    // post to the organization
    this.profileService.updateOrg(dynamicsPost).subscribe(
      (res: any) => {
        console.log(res);
        // success. Collect the transmogrifier and modify it.
        const temp: Transmogrifier = this.stateService.main.getValue();
        temp.organizationMeta.contactInformation = new ContactInformation(formValue);
        //update it in the state service
        this.stateService.main.next(temp);
        // route to another page
        this.router.navigate(['/authenticated/dashboard']);
      },
      err => console.log(err)
    )

  }
  onExecutiveContactChange(event: iPerson) {
    // cast the personish object to a person
    this.executiveContact = event;
  }
}

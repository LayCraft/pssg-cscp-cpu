import { Component, OnInit } from '@angular/core';
import { ContactInformation } from '../../core/models/contact-information.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { convertContactInformationToDynamics } from '../../core/models/converters/contact-information-to-dynamics';
import { iContactInformation } from '../../core/models/contact-information.interface';
import { iDynamicsPostOrg } from '../../core/models/dynamics-post';
import { iPerson } from '../../core/models/person.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  trans: Transmogrifier;
  contactInformationForm: FormGroup;
  executiveContact: iPerson = null;
  boardContact: iPerson = null;
  userId: string;
  organizationId: string;
  accountId: string;

  constructor(
    private router: Router,
    private stateService: StateService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    // subscribe to main
    this.stateService.main.subscribe((m: Transmogrifier) => {
      // save the transmogrifier
      this.trans = m;

      this.contactInformationForm = new FormGroup({
        'contactInformation': new FormControl('', Validators.required)
      });
      // console.log(m.organizationMeta.contactInformation);
      this.contactInformationForm.controls['contactInformation'].setValue(m.organizationMeta.contactInformation);
      this.executiveContact = m.organizationMeta.contactInformation.executiveContact;
      this.boardContact = m.organizationMeta.contactInformation.boardContact;
      // save the postback IDs
      this.userId = m.organizationMeta.userId;
      this.organizationId = m.organizationMeta.organizationId;
      this.accountId = m.organizationMeta.accountId;
    });
  }
  hasCriticalParts(): boolean {
    // TODO: this isn't the place to get the validity of the form overall but I want a cheat for the required info
    const c = this.contactInformationForm.value.contactInformation as iContactInformation;
    return !!c.emailAddress && !!c.phoneNumber && !!c.mainAddress.line1 && !!c.mainAddress.city && !!c.mainAddress.province && !!c.mainAddress.postalCode;
  }
  onSave(): void {

    // post to the organization
    this.profileService.updateOrg(convertContactInformationToDynamics(this.trans)).subscribe(
      (res: any) => {
        //update it in the state service
        this.stateService.main.next(new Transmogrifier(res));
        // route to another page
        this.router.navigate([this.stateService.homeRoute.getValue()]);
      },
      err => console.log(err)
    )
  }
  onExit() {
    if (confirm("All unsaved changes will be lost. Are you sure you want to return to the dashboard?")) {
      // send the user back to the dashboard
      this.router.navigate([this.stateService.homeRoute.getValue()]);
    }
  }
  onExecutiveContactChange(event: iPerson) {
    // cast the personish object to a person
    this.executiveContact = event;
  }
  onBoardContactChange(event: iPerson) {
    // cast the personish object to a person
    this.boardContact = event;
  }
}

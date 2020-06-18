import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { convertContactInformationToDynamics } from '../../core/models/converters/contact-information-to-dynamics';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { FormHelper } from '../../core/form-helper';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Address } from '../../core/models/address.class';
import { ContactInformation } from '../../core/models/contact-information.class';
import { iContactInformation } from '../../core/models/contact-information.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  trans: Transmogrifier;
  saving: boolean = false;
  private stateSubscription: Subscription;

  private formHelper = new FormHelper();
  originalContactInfo: iContactInformation;
  constructor(
    private router: Router,
    private stateService: StateService,
    private profileService: ProfileService,
    private notificationQueueService: NotificationQueueService
  ) { }

  ngOnInit() {
    // subscribe to main
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      // save the transmogrifier
      this.trans = m;
      this.originalContactInfo = _.cloneDeep(this.trans.contactInformation);
    });
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  cancel() {
    this.trans.contactInformation = this.originalContactInfo;
    this.originalContactInfo = _.cloneDeep(this.trans.contactInformation);
  }
  save(shouldExit: boolean = false): void {
    try {
      if (!this.formHelper.isFormValid(this.notificationQueueService)) {
        return;
      }

      //check for required fields
      //trans.contactInformation
      let contactInfo = new ContactInformation(this.trans.contactInformation);
      if (contactInfo.hasRequiredFields()) {
        // post to the organization
        this.saving = true;
        this.profileService.updateOrg(convertContactInformationToDynamics(this.trans))
          .subscribe(
            (res: any) => {
              this.saving = false;
              // notify
              this.notificationQueueService.addNotification('The contact information for your organization has been updated.', 'success');
              this.stateService.refresh();
              this.formHelper.makeFormClean();
              // route to another page
              if (shouldExit) this.router.navigate([this.stateService.homeRoute.getValue()]);
            },
            err => console.log(err)
          );
      }
      else {
        this.saving = false;
        this.notificationQueueService.addNotification('Please fill in required fields.', 'warning');
      }

    }
    catch (err) {
      console.log(err);
      this.notificationQueueService.addNotification('The contact information for your organization could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
      this.saving = false;
    }
  }
  onExit() {
    if (this.formHelper.isFormDirty()) {
      if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
        this.stateService.refresh();
        this.router.navigate(['/authenticated/dashboard']);
      }
    }
    else if (!this.formHelper.isFormDirty()) {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
  setMailingAddressSameAsMainAddress() {
    if (!this.trans.contactInformation.mailingAddressSameAsMainAddress) {
      // let addressCopy = _.cloneDeep(this.programApplication.mainAddress)
      // this.programApplication.mailingAddress = addressCopy;
      this.trans.contactInformation.mailingAddress = this.trans.contactInformation.mainAddress;
    }
    else {
      // let addressCopy = _.cloneDeep(this.trans.contactInformation.mailingAddress);
      this.trans.contactInformation.mailingAddress = new Address();//addressCopy;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { convertContactInformationToDynamics } from '../../core/models/converters/contact-information-to-dynamics';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { FormHelper } from '../../core/form-helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  trans: Transmogrifier;
  saving: boolean = false;

  private formHelper = new FormHelper();
  constructor(
    private router: Router,
    private stateService: StateService,
    private profileService: ProfileService,
    private notificationQueueService: NotificationQueueService
  ) { }

  ngOnInit() {
    // subscribe to main
    this.stateService.main.subscribe((m: Transmogrifier) => {
      // save the transmogrifier
      this.trans = m;
    });
  }
  save(): void {
    try {
      if (!this.formHelper.isFormValid(this.notificationQueueService)) {
        return;
      }
      // post to the organization
      this.saving = true;
      this.profileService.updateOrg(convertContactInformationToDynamics(this.trans))
        .subscribe(
          (res: any) => {
            this.saving = false;
            // notify
            this.notificationQueueService.addNotification('The contact information for your organization has been updated.', 'success');
            // route to another page
            this.router.navigate([this.stateService.homeRoute.getValue()]);
          },
          err => console.log(err)
        );
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
}

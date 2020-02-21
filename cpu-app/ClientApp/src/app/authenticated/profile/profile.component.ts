import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { convertContactInformationToDynamics } from '../../core/models/converters/contact-information-to-dynamics';
import { NotificationQueueService } from '../../core/services/notification-queue.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  trans: Transmogrifier;
  saving: boolean = false;

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
    // post to the organization
    this.saving = true;
    this.profileService.updateOrg(convertContactInformationToDynamics(this.trans))
      .subscribe(
        (res: any) => {
          this.saving = false;
          // notify
          this.notificationQueueService.addNotification('The contact information for your organization has been updated.', 'Success');
          // route to another page
          this.router.navigate([this.stateService.homeRoute.getValue()]);
        },
        err => console.log(err)
      );
  }
  onExit() {
    if (confirm("All unsaved changes will be lost. Are you sure you want to return to the dashboard?")) {
      //refresh info back to original state
      this.stateService.refresh();
      // send the user back to the dashboard
      this.router.navigate([this.stateService.homeRoute.getValue()]);
    }
  }
}

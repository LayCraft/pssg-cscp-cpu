import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transmogrifier } from '../models/transmogrifier.class';
import { MainService } from './main.service';
import { Router } from '@angular/router';
import { NotificationQueueService } from './notification-queue.service';
import { iDynamicsBlob } from '../models/dynamics-blob';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // these are observable states for the application load these in at login time.
  public main: BehaviorSubject<Transmogrifier> = new BehaviorSubject(null);
  // human readable name for the organization
  public organizationName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // primary lookup data is the organization id.
  public organizationId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // must post back with a BCeID
  public bceid: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // global state of the login
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private mainService: MainService,
    private router: Router,
    private notificationQueueService: NotificationQueueService,
  ) { }

  login() {
    //TODO: set BCeID from siteminder
    this.bceid.next('9e9b5111-51c9-e911-b80f-00505683fbf4');
    // on login collect the information from the organization id
    this.mainService.getBlob(this.bceid.getValue()).subscribe((m: iDynamicsBlob) => {
      // collect the blob into a useful object
      const mainData = new Transmogrifier(m);
      // save the useful blob in a behaviourSubject
      this.main.next(mainData);
      //save handy org name and id
      this.organizationName.next(mainData.organizationMeta.organizationName);
      this.organizationId.next(mainData.organizationMeta.organizationId);
      // give a notification
      this.notificationQueueService.addNotification(`${mainData.organizationMeta.organizationName} has been logged in successfully.`, 'success');
      // set the logged in state
      this.loggedIn.next(true);
    });
  }

  logout() {
    // clear the state and route to the homepage
    this.main.next(null);
    this.organizationName.next(null);
    this.organizationId.next(null);
    this.router.navigateByUrl('/');
    //notification about the login
    this.notificationQueueService.addNotification('User has logged out.', 'warning');
    this.loggedIn.next(false);
  }
  refresh() {
    // quick refresh of data
    this.mainService.getBlob(this.bceid.getValue()).subscribe((m: iDynamicsBlob) => {
      // collect the blob into a useful object
      const mainData = new Transmogrifier(m);
      // save the useful blob in a behaviourSubject
      this.main.next(mainData);
    });
  }
}

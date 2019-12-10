import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transmogrifier } from '../models/transmogrifier.class';
import { MainService } from './main.service';
import { Router } from '@angular/router';
import { NotificationQueueService } from './notification-queue.service';
import { iDynamicsBlob } from '../models/dynamics-blob';
import { iPerson } from '../models/person.class';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // these are observable states for the application load these in at login time.
  // main is the whole blob of data from the get request
  public main: BehaviorSubject<Transmogrifier> = new BehaviorSubject(null);
  // the user as an object
  public currentUser: BehaviorSubject<iPerson> = new BehaviorSubject<iPerson>(null);
  // global state of the login
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private mainService: MainService,
    private notificationQueueService: NotificationQueueService,
  ) { }

  login() {
    const userId = '9e9b5111-51c9-e911-b80f-00505683fbf4';
    const orgId = 'fd889a40-14b2-e811-8163-480fcff4f621';

    // on login collect the information from the organization id
    this.mainService.getBlob(userId, orgId).subscribe(
      (m: iDynamicsBlob) => {
        // collect the blob into a useful object
        const mainData = new Transmogrifier(m);
        // save the useful blob of viewmodels
        this.main.next(mainData);
        // save the user that matches the current bceid
        this.currentUser.next(mainData.persons.filter(p => p.userId === userId)[0]);
        // give a notification
        this.notificationQueueService.addNotification(`${mainData.organizationMeta.organizationName} has been logged in successfully.`, 'success');
        // set the logged in state
        this.loggedIn.next(true);
      }
    );
  }

  logout() {
    // clear the state and route to the homepage
    this.main.next(null);
    //notification about the login
    this.notificationQueueService.addNotification('User has logged out.', 'warning');
    this.loggedIn.next(false);
  }
  refresh() {
    // quick refresh of data
    const userId = this.main.getValue().organizationMeta.userId;
    const organizationId = this.main.getValue().organizationMeta.organizationId;
    this.mainService.getBlob(userId, organizationId).subscribe(
      (m: iDynamicsBlob) => {
        // collect the blob into a useful object
        const mainData = new Transmogrifier(m);
        // save the useful blob in a behaviourSubject
        this.main.next(mainData);
      }
    );
  }
}

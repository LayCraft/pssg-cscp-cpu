import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transmogrifier } from '../models/transmogrifier.class';
import { MainService } from './main.service';
import { NotificationQueueService } from './notification-queue.service';
import { iDynamicsBlob } from '../models/dynamics-blob';
import { iPerson } from '../models/person.interface';

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
  public newUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public homeRoute: BehaviorSubject<string> = new BehaviorSubject<string>('');


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
        // check for actual error message
        if (m.Result.includes('BusinessBCeID doesn\'t match to which the Contact belongs to')) {
          this.notificationQueueService.addNotification('Your organization\'s BCeID does not match one in our records.', 'danger');
          this.currentUser.next({
            userId,
            orgId,
            firstName: 'New',
            lastName: 'User',
            email: ''
          });
          // set the logged in state
          this.homeRoute.next('authenticated/new_user');
          this.loggedIn.next(true);
        } else if (m.Result.includes('No contact found with the supplied BCeID')) {
          this.notificationQueueService.addNotification('Your user BCeID does not match one in our records.', 'danger');
          this.currentUser.next({
            userId,
            orgId,
            firstName: 'New',
            lastName: 'User',
            email: ''
          });
          // set the logged in state
          this.homeRoute.next('authenticated/new_user');
          this.loggedIn.next(true);
        } else {
          // collect the blob into a useful object
          const mainData = new Transmogrifier(m);
          // save the useful blob of viewmodels
          this.main.next(mainData);
          // save the user that matches the current bceid
          this.currentUser.next(mainData.persons.filter(p => p.userId === userId)[0]);
          // give a notification
          this.notificationQueueService.addNotification(`${mainData.organizationMeta.organizationName} has been logged in successfully.`, 'success');

          // set the home button link and set log in to true (IN THAT ORDER)
          this.homeRoute.next('authenticated/dashboard');
          this.loggedIn.next(true);
        }
      }
    );
  }

  logout() {
    // clear the state and route to the homepage
    this.main.next(null);
    this.currentUser.next(null);
    //notification about the login
    this.notificationQueueService.addNotification('User has logged out.', 'warning');

    // set the home button link and set logout to false (IN THAT ORDER)
    this.homeRoute.next('');
    this.loggedIn.next(false);
  }
  refresh() {
    // quick refresh of data
    const userId = this.main.getValue().organizationMeta.userId;
    const organizationId = this.main.getValue().organizationMeta.organizationId;
    // only perform this get blob if the required information has been returned at least once
    // we need the user and organization id to do this
    if (userId && organizationId) {
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
}

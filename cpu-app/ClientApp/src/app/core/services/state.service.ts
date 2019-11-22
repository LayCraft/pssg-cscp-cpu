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
  // main is the whole blob of data from the get request
  public main: BehaviorSubject<Transmogrifier> = new BehaviorSubject(null);
  // human readable name for the organization
  public organizationName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // the organization's bceid.
  public organizationId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // the user's bceid
  public userId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // the account id
  public accountId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // global state of the login
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private mainService: MainService,
    private router: Router,
    private notificationQueueService: NotificationQueueService,
  ) { }

  login() {
    //TODO: set BCeID from siteminder
    this.userId.next('9e9b5111-51c9-e911-b80f-00505683fbf4');

    // on login collect the information from the organization id
    this.mainService.getBlob(this.userId.getValue()).subscribe(
      (m: iDynamicsBlob) => {
        // collect the blob into a useful object
        const mainData = new Transmogrifier(m);

        // save the useful blob of viewmodels
        this.main.next(mainData);

        //save handy information. For when you don't want to bring in a whole transmogrifier into the component
        this.organizationName.next(mainData.organizationMeta.organizationName);//what does dynamics say this organization's name is?
        this.organizationId.next(mainData.organizationId);//what does dynamics say the organization's bceid is?
        this.userId.next(mainData.userId);//what does dynamics say the user's bceid is?
        this.accountId.next(mainData.organizationMeta.accountId);//what is the dynamics primary key for postback
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
    this.organizationName.next(null);
    this.organizationId.next(null);
    this.router.navigateByUrl('/');
    //notification about the login
    this.notificationQueueService.addNotification('User has logged out.', 'warning');
    this.loggedIn.next(false);
  }
  refresh() {
    // quick refresh of data
    this.mainService.getBlob(this.userId.getValue()).subscribe(
      (m: iDynamicsBlob) => {
        // collect the blob into a useful object
        const mainData = new Transmogrifier(m);
        // save the useful blob in a behaviourSubject
        this.main.next(mainData);
      }
    );
  }
}

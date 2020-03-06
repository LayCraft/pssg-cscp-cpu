import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Transmogrifier } from '../models/transmogrifier.class';
import { MainService } from './main.service';
import { NotificationQueueService } from './notification-queue.service';
import { iDynamicsBlob } from '../models/dynamics-blob';
import { iPerson } from '../models/person.interface';
import { UserDataService } from './user-data.service';
import { Router } from '@angular/router';
import { iUserSettings } from '../models/user-settings.interface';
import { UserSettings } from '../models/user-settings.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

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
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userSettings: BehaviorSubject<iUserSettings> = new BehaviorSubject<iUserSettings>(new UserSettings());

  // public userId: string = "";
  // public orgId: string = "";
  // public loggedIn: boolean = false;
  // public isNewAccount: boolean = false;

  constructor(
    private mainService: MainService,
    private notificationQueueService: NotificationQueueService,
    private userData: UserDataService,
    private router: Router,
    private http: HttpClient,
  ) { }

  login() {
    let userId = 'FB55AB99F20E471186B8143B3F21F6E7';
    let orgId = 'E4637B1557A6457891D7549067B20635';

    console.log("logging in");
    let userInfo = this.userSettings.getValue();
    console.log(this.loggedIn.getValue(), userInfo.userId, userInfo.accountId);

    if (this.loggedIn.getValue() && !userInfo.isNewUserRegistration) {
      //in this case we have id's from siteminder login
      userId = userInfo.userId;
      orgId = userInfo.accountId;
    }
    this.loading.next(true);
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
          console.log("Dynamics blob");
          console.log(JSON.parse(JSON.stringify(m)));
          const mainData = new Transmogrifier(m);
          // save the useful blob of viewmodels
          this.main.next(mainData);
          // save the user that matches the current bceid
          this.currentUser.next(mainData.persons.filter(p => p.userId === userId)[0]);
          // give a notification
          this.notificationQueueService.addNotification(`${mainData.organizationName} has been logged in successfully.`, 'success');

          // set the home button link and set log in to true (IN THAT ORDER)
          this.homeRoute.next('authenticated/dashboard');
          this.router.navigate(['/authenticated/dashboard']);
          this.loggedIn.next(true);
        }
      },
      err => { },
      () => this.loading.next(false)
    );
  }
  logout() {
    // clear the state and route to the homepage
    if (window.location.href.includes("localhost")) {
      this.main.next(null);
      this.currentUser.next(null);
      this.userSettings.next(new UserSettings);
      //notification about the login
      this.notificationQueueService.addNotification('User has logged out.', 'warning');
  
      // set the home button link and set logout to false (IN THAT ORDER)
      this.homeRoute.next('');
      this.loggedIn.next(false);
    }
    else {
      this.userData.getLogoutUrl().subscribe((data: any) => {
        this.main.next(null);
        this.currentUser.next(null);
        this.userSettings.next(new UserSettings);
        //notification about the login
        this.notificationQueueService.addNotification('User has logged out.', 'warning');
    
        // set the home button link and set logout to false (IN THAT ORDER)
        // this.homeRoute.next('');
        this.loggedIn.next(false);
        window.location.href = data.logoutUrl;
      });
    }
  }
  refresh() {
    // quick refresh of data
    const userId = this.main.getValue().userId;
    const organizationId = this.main.getValue().organizationId;
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

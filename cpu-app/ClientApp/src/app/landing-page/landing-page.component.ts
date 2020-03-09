import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../core/services/user-data.service';
import { StateService } from '../core/services/state.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  window = window;
  showLogOut: boolean = false;
  constructor(private router: Router,
    private userData: UserDataService,
    private stateService: StateService) {

    if (document.cookie.indexOf("SMSESSION")) {
      //we have a SiteMinder cookie, and are in theory, looged in. we should be able to "Log Out" and get rid of it
      // this.showLogOut = true;
    }

    this.userData.getCurrentUser().subscribe((userSettings: any) => {
      console.log("returned user info:");
      console.log(userSettings);
      if (userSettings && userSettings.userBCeID && userSettings.businessBCeID) {
        console.log("setting user data as logged in");
        this.stateService.loggedIn.next(true);
        this.stateService.userSettings.next(userSettings);
      }
      else {
        this.stateService.loggedIn.next(false);
      }
    });
  }

  ngOnInit() {
  }

  login() {
    console.log("is logged in: ");
    console.log(this.stateService.loggedIn.getValue());
    if (this.stateService.loggedIn.getValue() || window.location.href.includes("localhost")) {
      this.stateService.login();
    }
    else {
      this.window.location.href = 'login';
    }
  }
  logout() {
    this.stateService.logout();
  }
}

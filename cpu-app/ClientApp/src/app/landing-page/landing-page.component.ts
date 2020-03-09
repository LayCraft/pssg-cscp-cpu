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
  loggedIn: boolean = false;
  constructor(private router: Router,
    private userData: UserDataService,
    private stateService: StateService) {

    this.userData.getCurrentUser().subscribe((userSettings: any) => {
      console.log("returned user info:");
      console.log(userSettings);
      if (userSettings && userSettings.userAuthenticated) {
        console.log("setting user data as logged in");
        this.stateService.loggedIn.next(true);
        this.loggedIn = true;
        this.stateService.userSettings.next(userSettings);
      }
      else {
        this.loggedIn = false;
        this.stateService.loggedIn.next(false);
      }
    });
  }

  ngOnInit() {
  }

  login() {
    if (window.location.href.includes("localhost")) {
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

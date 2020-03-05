import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../core/services/user-data.service';
import { StateService } from '../core/services/state.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './login.component.html'
})
export class LoginPageComponent implements OnInit {
  loading: boolean = true;
  constructor(private router: Router,
    private userData: UserDataService,
    private stateService: StateService) {
    console.log("login page...");

    this.userData.getCurrentUser().subscribe((userInfo: any) => {
      console.log("returned user info:");
      console.log(userInfo);
      if (userInfo && userInfo.userId && userInfo.accountId) {
        console.log("setting user data as logged in");
        this.stateService.loggedIn.next(true);
        this.stateService.userSettings.next(userInfo);

        if (userInfo.isNewUserRegistration) {
          this.router.navigate([this.stateService.homeRoute.getValue()]);
        }
        else {
          this.stateService.login();
        }
      }
      else {
        this.stateService.loggedIn.next(false);
        this.router.navigate([this.stateService.homeRoute.getValue()]);
      }
    });
   }

  ngOnInit() {
  }
}

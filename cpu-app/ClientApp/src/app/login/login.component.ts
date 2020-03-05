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

    this.userData.getCurrentUser().subscribe((res: any) => {
      console.log("returned user info:");
      console.log(res);
      if (res && res.userId && res.accountId) {
        console.log("setting user data as logged in");
        this.userData.loggedIn = true;
        this.userData.userId = res.userId;
        this.userData.orgId = res.accountId;
        this.userData.isNewAccount = res.isNewUserRegistration;

        if (this.userData.isNewAccount) {
          this.router.navigate([this.stateService.homeRoute.getValue()]);
        }
        else {
          this.stateService.login();
        }
      }
      else {
        this.userData.loggedIn = false;
        this.router.navigate([this.stateService.homeRoute.getValue()]);
      }
    });
   }

  ngOnInit() {
  }
}

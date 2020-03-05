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

    this.userData.getCurrentUser().subscribe((res: any) => {
      console.log("returned user info:");
      console.log(res);
      if (res && res.userBCeID && res.businessBCeID) {
        console.log("setting user data as logged in");
        this.userData.loggedIn = true;
        this.userData.userId = res.userBCeID;
        this.userData.orgId = res.businessBCeID;
        this.userData.isNewAccount = res.isNewUserRegistration;
      }
      else {
        this.userData.loggedIn = false;
      }
    });
  }

  ngOnInit() {
  }

  logOut() {
    console.log("need to get logout url...");
  }
}

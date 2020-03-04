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
  constructor(private router: Router,
    private userData: UserDataService,
    private stateService: StateService) {
    console.log("testing");
    this.userData.getCurrentUser().subscribe((res: any) => {
      console.log("user info...");
      console.log(res);
      if (res) res = JSON.parse(JSON.stringify(res));
      if (res && res.UserBCeID && res.BusinessBCeID) {
        console.log("setting user data logged in");
        this.userData.loggedIn = true;
        this.userData.userId = res.UserBCeID;
        this.userData.orgId = res.BusinessBCeID;
      }
      else {
        this.userData.loggedIn = false;
      }
    });
  }

  ngOnInit() {
  }
}

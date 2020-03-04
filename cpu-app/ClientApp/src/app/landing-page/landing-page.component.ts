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
    this.userData.getCurrentUser().subscribe((res: any) => {
      console.log("returned user info:");
      console.log(res);
      if (res && res.userBCeID && res.businessBCeID) {
        console.log("setting user data as logged in");
        this.userData.loggedIn = true;
        this.userData.userId = res.userBCeID;
        this.userData.orgId = res.businessBCeID;
      }
      else {
        this.userData.loggedIn = false;
      }
    });
  }

  ngOnInit() {
  }
}

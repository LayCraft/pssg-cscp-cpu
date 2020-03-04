import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { nameAssemble } from '../../core/constants/name-assemble'
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Victims Services Community Programs Unit';
  currentUser: string;
  nameAssemble;
  loggedIn: boolean = false;
  loading = false;
  constructor(
    private router: Router,
    private stateService: StateService,
    private userData: UserDataService,
  ) {
    // for building names
    this.nameAssemble = nameAssemble;
  }

  ngOnInit() {
    this.stateService.loggedIn.subscribe((l: boolean) => {
      this.loggedIn = l;
      this.router.navigate([this.stateService.homeRoute.getValue()]);
    });
    this.stateService.currentUser.subscribe(u => {
      if (u) {
        this.currentUser = nameAssemble(u.firstName, u.middleName, u.lastName);
      }
    });
    this.stateService.loading.subscribe(l => this.loading = l);
  }
  login() {
    if (this.userData.loggedIn) {
      this.stateService.loginNew(this.userData.userId, this.userData.orgId);
    }
    else {
      this.stateService.login();
    }
  }
  logout() {
    this.stateService.logout();
  }
  homeButton() {
    // this is done without a routerlink because you will want to route the user back to a place
    // that is appropriate for their role. So check their logged in state and etc before deciding which route they go to.
    this.router.navigate([this.stateService.homeRoute.getValue()]);
  }
}

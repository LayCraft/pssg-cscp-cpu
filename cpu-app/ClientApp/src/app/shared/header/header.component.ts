import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  organizationName: string = '';
  title: string = 'Victims Services Community Programs Unit';
  constructor(
    private router: Router,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.stateService.loggedIn.subscribe(l => this.loggedIn = l);
    this.stateService.organizationName.subscribe(u => {
      if (this.organizationName === '') {
        // this is the first page visit. Just skip the notifications.
        // If it were null it came after a logout.
      } else if (!u) {
        // User signed out because behaviour subject was blank
        // Go back home!m
        this.router.navigate(['']);
      } else {
        // User signed in because behaviour subject was not blank
        this.router.navigate(['/authenticated/dashboard']);
      }
      // save the organization for displaying
      this.organizationName = u;
    });
  }
  login() {
    this.stateService.login();
  }
  logout() {
    this.stateService.logout();
  }
  homeButton() {
    // this is done without a routerlink because you will want to route the user back to a place
    // that is appropriate for their role. So check their logged in state and etc before deciding which route they go to.
    if (this.stateService.loggedIn.getValue()) {
      this.router.navigate(['/authenticated/dashboard']);
    } else {
      this.router.navigate(['']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { iPerson } from '../../core/models/person.class';
import { nameAssemble } from '../../core/constants/name-assemble'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  title: string = 'Victims Services Community Programs Unit';
  currentUser: string;
  nameAssemble;

  constructor(
    private router: Router,
    private stateService: StateService,
  ) {
    // for building names
    this.nameAssemble = nameAssemble;
  }

  ngOnInit() {
    this.stateService.loggedIn.subscribe(l => {
      this.loggedIn = l;
      // if the user is not logged in anymore route them home
      l ? this.router.navigate(['/authenticated/dashboard']) : this.router.navigate(['']);
    });
    this.stateService.currentUser.subscribe(u => {
      if (u) {
        this.currentUser = nameAssemble(u.firstName, u.middleName, u.lastName);
      }
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

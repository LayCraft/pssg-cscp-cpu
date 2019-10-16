import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: string = '';
  title: string = 'Victims Services Community Programs Unit';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationQueueService: NotificationQueueService,
  ) { }

  ngOnInit() {
    this.authenticationService.user.subscribe(u => {
      if (this.user === '') {
        // this is the first page visit. Just skip the notifications.
        // If it were null it came after a logout.
      } else if (!u) {
        // User signed out because behaviour subject was blank
        this.notificationQueueService.addNotification('User has logged out.', 'warning');
        // Go back home!m
        this.router.navigate(['']);
      } else {
        // User signed in because behaviour subject was not blank
        this.notificationQueueService.addNotification(`${u} has been logged in successfully.`, 'success');
        this.router.navigate(['/authenticated/dashboard']);

      }
      this.user = u;
    });
  }
  login() {
    this.authenticationService.login();
  }
  logout() {
    this.authenticationService.logout();
  }
  homeButton() {
    // this is done without a routerlink because you will want to route the user back to a place
    // that is appropriate for their role. So check their logged in state and etc before deciding which route they go to.
    this.router.navigate(['']);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationQueueService } from '../services/notification-queue.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  // this checks if the user is authenticated. If they are not they can't route to a guarded route
  // We seperate concerns about authentication and authorization.

  constructor(
    private authenticationService: AuthenticationService,
    private notificationQueueService: NotificationQueueService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // for this simple system we go see if the user is null.
    // In a production system this set of checks should be stronger.
    let user = this.authenticationService.user.getValue()
    if (user) {
      // the user is logged in
      return of(true);
    } else {
      // notify the user that they can't navigate here. More of a demo thing. These links shouldn't be shown or should be disabled.
      this.notificationQueueService.addNotification('You cannot route here because you have not authenticated. Please log in.', 'danger');
      return of(false);
    }
  }
}

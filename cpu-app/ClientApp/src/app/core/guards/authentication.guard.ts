import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotificationQueueService } from '../services/notification-queue.service';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  // this checks if the user is authenticated. If they are not they can't route to a guarded route
  // We seperate concerns about authentication and authorization.

  constructor(
    private notificationQueueService: NotificationQueueService,
    private stateService: StateService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // if they are logged in they can activate the route
    if (this.stateService.loggedIn.getValue()) {
      // the user is logged in
      return of(true);
    } else {
      // notify the user that they can't navigate here. More of a demo thing. These links shouldn't be shown or should be disabled.
      this.notificationQueueService.addNotification('You cannot route here because you have not authenticated. Please log in.', 'danger');
      return of(false);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  // This is an interceptor. It faithfully listens for all 401 errors and forces a logout if one is found.
  // It can be used to handle various error statuses application wide.
  // It sits and inspects packets. If you want to remove it, it is loaded as a provider in the app module.

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // handle all of the requests
    return next.handle(request).pipe(
      // handle all of the events by mapping them
      map(event => event),
      // handle errors
      catchError((error: HttpErrorResponse) => {
        // check if error is "not logged in"
        if (error.status === 401 && this.router.url !== '/') {
          // perform logout
          this.authenticationService.logout();
          // redirect to session expired page
          this.router.navigate(['/'])
        }
        return throwError(error);
      })
    );
  }

}

import { retry, catchError } from 'rxjs/operators';
import { iDynamicsScheduleFResponse } from '../models/dynamics-blob';
import { iDynamicsPostScheduleF } from '../models/dynamics-post';
import { Observable, throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // this should query the test api
  apiUrl = 'api/User';
  public userId: string = "";
  public orgId: string = "";
  public loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }

  getCurrentUser() {
    return this.http.get<iDynamicsScheduleFResponse>(`${this.apiUrl}/current`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  get headers(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  protected handleError(err): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { iDynamicsScheduleFResponse, iDynamicsScheduleFPost } from '../models/dynamics-blob';


@Injectable({
  providedIn: 'root'
})
export class ProgramApplicationService {
  // this should query the test api
  apiUrl = 'api/DynamicsProgramApplication';

  constructor(
    private http: HttpClient,
  ) { }

  getScheduleF(organizationId: string, userId: string, scheduleFId: string): Observable<iDynamicsScheduleFResponse> {
    return this.http.get<iDynamicsScheduleFResponse>(`${this.apiUrl}/${organizationId}/${userId}/${scheduleFId}`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  setScheduleF(budgetProposal: iDynamicsScheduleFPost): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, budgetProposal, { headers: this.headers }).pipe(
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

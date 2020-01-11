import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { iDynamicsScheduleGResponse } from '../models/dynamics-blob';
import { iDynamicsPostScheduleG } from '../models/dynamics-post';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService {
  // this should query the test api
  apiUrl = 'api/DynamicsExpenseReport';

  constructor(
    private http: HttpClient,
  ) { }

  getScheduleG(organizationId: string, userId: string, scheduleGId: string): Observable<iDynamicsScheduleGResponse> {
    return this.http.get<iDynamicsScheduleGResponse>(`${this.apiUrl}/${organizationId}/${userId}/${scheduleGId}`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  setScheduleG(scheduleG: iDynamicsPostScheduleG) {
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

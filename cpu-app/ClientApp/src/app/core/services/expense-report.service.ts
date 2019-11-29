import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { iDynamicsScheduleGResponse } from '../models/dynamics-schedule-g-response';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService {
  // this should query the test api
  apiUrl = 'api/DynamicsScheduleG';

  constructor(
    private http: HttpClient,
  ) { }

  getScheduleG(scheduleGId: string): Observable<iDynamicsScheduleGResponse> {
    return this.http.get<iDynamicsScheduleGResponse>(`${this.apiUrl}/${scheduleGId}`, { headers: this.headers }).pipe(
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

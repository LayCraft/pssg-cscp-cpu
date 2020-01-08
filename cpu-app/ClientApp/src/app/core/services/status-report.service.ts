import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusReportService {
  //this service does a "collect questions" and a "set and forget" It is unlike other parts of the application in that the user is expected not to stop and resume the process. Type them all in at once and send it.

  apiUrl = 'api/DynamicsMonthlyStatistics';

  constructor(
    private http: HttpClient,
  ) { }

  getStatusReportQuestions(organizationId: string, userId: string, programId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${organizationId}/${userId}/${programId}`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  setStatusReport(statusReport: any) {
    alert('Unimplemented');
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

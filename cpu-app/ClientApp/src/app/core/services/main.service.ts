import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { iDynamicsBlob } from '../models/dynamics-blob';
import { retry, catchError } from 'rxjs/operators';
import { NotificationQueueService } from './notification-queue.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // this should query the test api
  apiUrl = 'api/DynamicsBlob/';

  constructor(
    private http: HttpClient,
    private notificationQueueService: NotificationQueueService
  ) { }

  getBlob(bceid: string): Observable<iDynamicsBlob> {
    return this.http.get<iDynamicsBlob>(this.apiUrl + bceid, { headers: this.headers }).pipe(
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

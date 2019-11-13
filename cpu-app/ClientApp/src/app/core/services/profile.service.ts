import { Injectable } from '@angular/core';
import { iDynamicsBlob } from '../models/dynamics-blob';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { iDynamicsPostOrg } from '../models/dynamics-post';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // this should query the test api
  apiUrl = 'api/DynamicsOrg';

  constructor(
    private http: HttpClient
  ) { }

  updateOrg(org: iDynamicsPostOrg): Observable<any> {
    console.log(org);
    return this.http.post<any>(this.apiUrl, org, { headers: this.headers }).pipe(
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

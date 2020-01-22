import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  apiUrl = 'api/DynamicsFile';

  constructor(
    private http: HttpClient,
  ) { }

  download(organizationId: string, userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${organizationId}/${userId}`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  upload(organizationId: string, userId: string, file: any): Observable<any> {
    // return this.http.post<any>(`${this.apiUrl}/${organizationId}/${userId}`, file, { headers: this.headers }).pipe(
    //   retry(3),
    //   catchError(this.handleError)
    // );
    return of(null);
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

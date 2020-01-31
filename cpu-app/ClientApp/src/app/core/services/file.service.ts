import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { iDynamicsFile } from '../models/dynamics-file.interface';
import { iDynamicsFilePost } from '../models/dynamics-post';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  apiUrl = 'api/DynamicsFile';

  constructor(
    private http: HttpClient,
  ) { }

  download(organizationId: string, userId: string, contractId: string): Observable<iDynamicsFile> {
    return this.http.get<iDynamicsFile>(`${this.apiUrl}/${organizationId}/${userId}/${contractId}`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  upload(file: iDynamicsFilePost): Observable<any> {
    // may need to add the contract id into this postback
    return this.http.post<any>(`${this.apiUrl}`, file, { headers: this.headers }).pipe(
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

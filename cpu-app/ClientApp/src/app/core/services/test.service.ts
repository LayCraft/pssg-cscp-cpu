import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TestService {
	// this should query the test api
	apiUrl = 'api/test';

	constructor(private http: HttpClient) { }

	getTest(): Observable<any> {
		return this.http.get<any>(this.apiUrl, { headers: this.headers }).pipe(
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactInformation } from '../interfaces/contact-information.class';

@Injectable({
  providedIn: 'root'
})
export class RenewApplicationService {

  // TODO: This is clearly a fake API route
  apiRoute = 'api/snappy-renew-the-appy-eh-pee-eye';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }
  submitContactInformation(data: ContactInformation): Observable<object> {
    return this.http.post(`${this.apiRoute}/contact-info`, data.toDynamics(), { headers: this.headers });
  }
}

import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { iContactInformation } from '../interfaces/contact-information.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicantInfoService {

  constructor() { }
  getApplicantContactInfo(): Observable<iContactInformation> {
    return of({
      organizationName: 'BC Social Work Society',
      contractNumber: '19052-FY20',
      emailAddress: 'foo@bar.baz',
    } as iContactInformation);
  }
}

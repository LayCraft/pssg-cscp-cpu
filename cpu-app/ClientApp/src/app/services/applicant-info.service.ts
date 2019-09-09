import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { iContactInformation } from '../classes/contact-information.class';

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
      phoneNumber: '2502502500',
      mainAddress: {
        city: 'Victoria',
        postalCode: 'v8v3b3',
        line1: '1234 Douglas St',
        province: 'British Columbia',
      },
      mailingAddress: {
        city: 'Saanich',
        postalCode: 'v8v3b3',
        line1: 'Box 430',
        province: 'British Columbia',
      }
    } as iContactInformation);
  }
}

import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { iContactInformation } from '../models/contact-information.class';

@Injectable({
  providedIn: 'root'
})
export class BoilerplateService {
  boilerplate = {
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
  };

  constructor() { }
  getOrganizationBoilerplate(bceid: string): Observable<iContactInformation> {
    return of(this.boilerplate as iContactInformation);
  }
  setOrganizationBoilerplate(bceid: string, boilerplate: iContactInformation): Observable<iContactInformation> {
    this.boilerplate = boilerplate;
    return of(this.boilerplate as iContactInformation);
  }
}

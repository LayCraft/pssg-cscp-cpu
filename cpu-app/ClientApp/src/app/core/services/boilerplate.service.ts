import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { iContactInformation } from '../models/contact-information.class';

@Injectable({
	providedIn: 'root'
})
export class BoilerplateService {
	boilerplate = {
		// 	emailAddress: 'foo@bar.baz',
		// 	faxNumber: '1234567890',
		// 	phoneNumber: '2502502500',
		// 	mainAddress: {
		// 		city: 'Victoria',
		// 		postalCode: 'v8v3b3',
		// 		line1: '1234 Douglas St',
		// 		line2: '',
		// 		province: 'British Columbia',
		// 	},
		// 	mailingAddress: {
		// 		city: 'Saanich',
		// 		postalCode: 'v8v3b3',
		// 		line1: 'Box 430',
		// 		line2: '',
		// 		province: 'British Columbia',
		// 	}
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

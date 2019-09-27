import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { iContactInformation } from '../models/contact-information.class';
export interface iOrganizationMeta {
	organizationName: string;
	contracts: string[];
	emailAddress: string;
	phoneNumber: string;
}
@Injectable({
	providedIn: 'root'
})
export class BoilerplateService {
	boilerplate = {
		emailAddress: 'foo@bar.baz',
		faxNumber: '1234567890',
		phoneNumber: '2502502500',
		mainAddress: {
			city: 'Victoria',
			postalCode: 'v8v3b3',
			line1: '1234 Douglas St',
			line2: '',
			province: 'British Columbia',
		},
		// 	mailingAddress: {
		// 		city: 'Saanich',
		// 		postalCode: 'v8v3b3',
		// 		line1: 'Box 430',
		// 		line2: '',
		// 		province: 'British Columbia',
		// 	}
	} as iContactInformation;
	meta = {
		organizationName: 'BC Social',
		contracts: ['179898-asa', '1230941-qux']
	} as iOrganizationMeta;

	constructor() { }
	getOrganizationBoilerplate(bceid: string): Observable<iContactInformation> {
		return of(this.boilerplate as iContactInformation);
	}
	setOrganizationBoilerplate(bceid: string, boilerplate: iContactInformation): Observable<iContactInformation> {
		this.boilerplate = boilerplate;
		return of(this.boilerplate as iContactInformation);
	}
	getOrganizationMeta(bceid: string): Observable<iOrganizationMeta> {
		this.meta.emailAddress = this.boilerplate.emailAddress;
		this.meta.phoneNumber = this.boilerplate.phoneNumber;
		return of(this.meta as iOrganizationMeta);
	}
}

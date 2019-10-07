import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iProgramApplication } from '../models/program-application.class';

@Injectable({
	providedIn: 'root'
})
export class ProgramApplicationService {
	dummyProgram: iProgramApplication = {
		programId: 'qwreyturwqeyu',
		contractId: '2768194124',
		email: "foo@fibble.ca",
		programLocation: "Quxville",
		serviceArea: "Metro Fibbletown",
		phoneNumber: "12505551023",
		faxNumber: "12505551023",
		mainAddress: null,
		mailingAddress: null,
		programContact: null,
		additionalStaff: [],
		revenueSources: [],
		operationHours: [],
		standbyHours: null,
	};

	constructor() {
		this.dummyProgram.programLocation = "Bork"
	}

	getProgramApplication(organizationId: string, programId: string): Observable<iProgramApplication> {
		const bork = { ...this.dummyProgram };
		bork.programId = programId;
		return of(bork as iProgramApplication);
	}
}

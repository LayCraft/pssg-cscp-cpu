import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iProgramApplication, iAnnualProgramApplication } from '../models/program-application.class';

@Injectable({
	providedIn: 'root'
})
export class ProgramApplicationService {
	dummyProgram: iAnnualProgramApplication = {
		organizationId: 'asfdljjlkhasfd',
		contractId: '712389327891',
		formState: 'incomplete',
		programs: [
			{
				name: 'Program One',
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
			} as iProgramApplication,
			{
				name: 'Program Two',
				programId: 'aafsdfasdfsda',
				contractId: '547465745',
				email: "baz@fibble.ca",
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
			} as iProgramApplication
		]
	};

	constructor() { }

	getProgramApplication(organizationId: string, contractId: string): Observable<iAnnualProgramApplication> {
		const bork = { ...this.dummyProgram };
		return of(bork as iAnnualProgramApplication);
	}
}

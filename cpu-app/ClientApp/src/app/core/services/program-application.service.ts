import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iProgramMeta, iProgramApplication } from '../models/program-application.class';

@Injectable({
	providedIn: 'root'
})
export class ProgramApplicationService {
	dummyProgram: iProgramApplication = {
		organizationId: '',
		programId: '',
		contractId: '',
		organizationName: "Foobar",
		contractNumber: "baz",
		emailAddress: "foo@fibble.ca",
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
		personnel: [],
	};

	constructor() {
		this.dummyProgram.programLocation = "Bork"
	}

	getProgramInformation(organizationId: string, programId: string): Observable<iProgramApplication> {
		const bork = { ...this.dummyProgram };
		bork.organizationId = organizationId;
		bork.programId = programId;
		return of(bork as iProgramApplication);
	}
	getProgramInformationMeta(organizationId: string, contractId: string): Observable<iProgramMeta[]> {
		return of([
			{
				organizationId: organizationId,
				contractId: contractId,
				programId: 'PROGRAM1',
				programName: 'Social Work East Van'
			},
			{
				organizationId: organizationId,
				contractId: contractId,
				programId: 'PROGRAM2',
				programName: 'Social Work Tri-cities'
			},
			{
				organizationId: organizationId,
				contractId: contractId,
				programId: 'PROGRAM3',
				programName: 'Social Work Burnaby'
			},
			{
				organizationId: organizationId,
				contractId: contractId,
				programId: 'PROGRAM4',
				programName: 'Social Work New West'
			}
		]);
	}
}

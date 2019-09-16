import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iProgramInformation, iProgramMeta, ProgramInformation } from '../classes/program-information.class';

@Injectable({
  providedIn: 'root'
})
export class ProgramInformationService {
  dummyProgram: iProgramInformation = {
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

  getProgramInformation(organizationId: string, programId: string): Observable<iProgramInformation> {
    const bork = { ...this.dummyProgram };
    bork.organizationId = organizationId;
    bork.programId = programId;
    return of(bork);
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
      },]);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iProgramInformation, iProgramMeta } from '../classes/program-information.class';

@Injectable({
  providedIn: 'root'
})
export class ProgramInformationService {

  constructor() { }
  getProgramInformation(oranizationId: string, programId: string): Observable<iProgramInformation> {
    return of({} as iProgramInformation);
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

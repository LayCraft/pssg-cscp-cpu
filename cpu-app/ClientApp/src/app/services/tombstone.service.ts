import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iTombstone } from '../classes/tombstone.class';

@Injectable({
  providedIn: 'root'
})
export class TombstoneService {
  getTombstones(bceid: string): Observable<iTombstone[]> {
    const t = [
      {
        formName: 'Program Application',
        formType: 'program_app',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Not Started',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'BCSWS',
        frequency: 'annual',
      } as iTombstone,
      {
        formName: 'Schedule F',
        formType: 'sched_f',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Started',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your Schedule F by the Due Date',
        contractNumber: '1097583',
        organizationId: 'BCSWS',
        frequency: 'quarterly',
      } as iTombstone,
      {
        formName: 'Schedule G',
        formType: 'sched_g',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Late',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your Schedule F by the Due Date',
        contractNumber: '1097583',
        organizationId: 'BCSWS',
        frequency: 'quarterly',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_app',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Awaiting Approval',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'BCSWS',
        frequency: 'annual',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_app',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Submitted',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'BCSWS',
        frequency: 'annual',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_app',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Missed',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'BCSWS',
        frequency: 'annual',
      } as iTombstone,
    ];

    return of(t);
  }
}

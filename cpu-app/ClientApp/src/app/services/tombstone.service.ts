import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iTombstone, iProgramTombstone, ProgramTombstone } from '../classes/tombstone.class';
import { DynamicsBlob } from '../classes/dynamics-blob';
import { Person, iPerson } from '../classes/person.class';

@Injectable({
  providedIn: 'root'
})
export class TombstoneService {
  // ['program_applicationlication', 'budget_proposal', 'status_report', 'expense_report']

  getTombstones(bceid: string): Observable<iTombstone[]> {
    const t = [
      {
        formName: 'Monthly Update',
        formType: 'status_report',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Action Required',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'qwer',
        frequency: 'annual',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_application',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Action Required',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'qwer',
        frequency: 'annual',
      } as iTombstone,
      {
        formName: 'Budget Proposal',
        formType: 'budget_proposal',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Started',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your Budget Proposal by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'wert',
        frequency: 'quarterly',
      } as iTombstone,
      {
        formName: 'Expense Report',
        formType: 'expense_report',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Submitted',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your Budget Proposal by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'erty',
        frequency: 'quarterly',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_application',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Late',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'rtyu',
        frequency: 'annual',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_application',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Missed',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'uiop',
        frequency: 'annual',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_application',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Missed',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'asdf',
        frequency: 'annual',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_application',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Complete',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        lastUpdated: new Date('2019-12-12'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'sdfg',
        frequency: 'annual',
        internalNote: '',
      } as iTombstone,
      {
        formName: 'Program Application',
        formType: 'program_application',
        formDeadline: new Date('2019-12-31'),
        formStatus: 'Complete',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        lastUpdated: new Date('2019-12-12'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'aacb8575ac5acb363a64ca',
        programId: 'dfgh',
        frequency: 'annual',
        internalNote: '',
      } as iTombstone,

    ];
    return of(t);
  }
  getProgramTombstones(bceid: string): Observable<DynamicsBlob> {
    const t: iProgramTombstone[] = [{
      programContact: {
        firstName: 'Tony',
        middleName: 'Eugene',
        lastName: 'Stark',
        title: 'Man of Iron',
        email: 'tonystark67@hotmail.com',
      } as iPerson,
      programName: 'Marvel Compassion Club',
      contractNumber: 'PDA-12345',
      organizationId: 'BCEID goes here',
      programId: 'qwer'
    },
    {
      programContact: {
        firstName: 'Dick',
        middleName: 'Pete',
        lastName: 'Grayson',
        title: 'The Robin',
        email: 'trickydickgrayson@yahoo.com.cn',
      } as iPerson,
      programName: 'Social Work Metropolis',
      programId: 'wert',
      contractNumber: 'PDF-91191',
      organizationId: 'BCEID goes here',
    }];
    return of(t);
  }
}

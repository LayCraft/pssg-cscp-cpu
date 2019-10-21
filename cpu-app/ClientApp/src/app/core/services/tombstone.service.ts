import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iTombstone, iProgramTombstone } from '../models/tombstone.class';
import { iPerson } from '../models/person.class';


@Injectable({
  providedIn: 'root'
})
export class TombstoneService {
  // ['program_applicationlication', 'budget_proposal', 'status_report', 'expense_report']

  getTombstones(bceid: string): Observable<iTombstone[]> {
    const t = [
      {
        contractId: 'foo',
        contractNumber: '15092013-21',
        forDateRangeEnd: new Date('2020-04-20'),
        forDateRangeStart: new Date('2020-04-20'),
        formDeadline: new Date('2020-01-15'),
        formName: 'Contract Renewal Application',
        formStatus: 'Started',
        formType: 'program_application',
        frequency: 'annual',
        lastUpdated: new Date('2019-05-01'),
        organizationId: 'aacb8575ac5acb363a64ca'
      } as iTombstone,
      {
        contractId: 'foo',
        contractNumber: '15092013-21',
        forDateRangeEnd: new Date('2021-03-31'),
        forDateRangeStart: new Date('2020-04-01'),
        formDeadline: new Date('2020-01-15'),
        formName: 'Budget Proposal',
        formStatus: 'Action Required',
        formType: 'status_report',
        frequency: 'annual',
        organizationId: 'aacb8575ac5acb363a64ca'
      } as iTombstone,
      {
        contractId: 'bar',
        contractNumber: '15092013-20',
        forDateRangeEnd: new Date('2019-06-30'),
        forDateRangeStart: new Date('2019-04-01'),
        formDeadline: new Date('2019-07-30'),
        formName: 'Schedule G',
        formStatus: 'Completed',
        formType: 'expense_report',
        frequency: 'quarterly',
        organizationId: 'aacb8575ac5acb363a64ca',
        programName: 'Burns Lake RCMP Victim Assistance Program',
        note: 'FY19-Q1'
      } as iTombstone,
      {
        contractId: 'bar',
        contractNumber: '15092013-20',
        forDateRangeEnd: new Date('2019-09-30'),
        forDateRangeStart: new Date('2019-07-01'),
        formDeadline: new Date('2019-10-30'),
        formName: 'Schedule G',
        formStatus: 'Action Required',
        formType: 'expense_report',
        frequency: 'quarterly',
        organizationId: 'aacb8575ac5acb363a64ca',
        programName: 'Burns Lake RCMP Victim Assistance Program',
        note: 'FY19-Q2'
      } as iTombstone,
      {
        contractId: 'bar',
        contractNumber: '15092013-20',
        forDateRangeEnd: new Date('2019-06-30'),
        forDateRangeStart: new Date('2019-04-01'),
        formDeadline: new Date('2019-07-30'),
        formName: 'Schedule G',
        formStatus: 'Completed',
        formType: 'expense_report',
        frequency: 'quarterly',
        organizationId: 'aacb8575ac5acb363a64ca',
        programName: 'Community Program 1',
        note: 'FY19-Q1'
      } as iTombstone,
      {
        contractId: 'bar',
        contractNumber: '15092013-20',
        forDateRangeEnd: new Date('2019-09-30'),
        forDateRangeStart: new Date('2019-07-01'),
        formDeadline: new Date('2019-10-30'),
        formName: 'Schedule G',
        formStatus: 'Action Required',
        formType: 'expense_report',
        frequency: 'quarterly',
        organizationId: 'aacb8575ac5acb363a64ca',
        programName: 'Community Program 1',
        note: 'FY19-Q2'

      } as iTombstone,
    ];
    return of(t);
  }
  getProgramTombstones(bceid: string): Observable<iProgramTombstone[]> {
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
      programId: 'NCC-1701'
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
    }] as iProgramTombstone[];
    return of(t);
  }
}

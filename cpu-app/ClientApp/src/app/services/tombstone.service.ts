import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iContactInformation } from '../classes/contact-information.class';
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
        formStatus: 'Submitted',
        forDateRangeStart: new Date('2019-01-01'),
        forDateRangeEnd: new Date('2019-12-31'),
        note: 'Please submit your annual Program Application by the Due Date',
        contractNumber: '1097583',
        organizationId: 'BCSWS',
        frequency: 'annual',
      } as iTombstone,
    ];

    //   <tr>
    //   <th scope="row">1</th>
    //   <td>Program Application</td>
    //   <td>Not Started</td>
    //   <td>2019-06-11</td>
    //   <td><a href="#" routerLink="renew-application">Start Application</a></td>
    //   <td>Please submit your annual Program Application by the Due Date</td>
    // </tr>
    // <tr>
    //   <th scope="row">2</th>
    //   <td>FY19 Q3 Schedule G</td>
    //   <td>Not Started</td>
    //   <td>2019-06-11</td>
    //   <td><a href="#">Complete Form</a></td>
    //   <td>Please submit your annual Program Application by the Due Date</td>
    // </tr>
    // <tr>
    //   <th scope="row">2</th>
    //   <td>FY19 Q3 Schedule M</td>
    //   <td>Not Started</td>
    //   <td>2019-06-11</td>
    //   <td><a href="#">Complete Form</a></td>
    //   <td>Please submit your annual Program Application by the Due Date</td>
    // </tr>
    // <tr class="table-success">
    //   <th scope="row">3</th>
    //   <td>FY19 Q3 Schedule G</td>
    //   <td>Submitted</td>
    //   <td>2019-06-11</td>
    //   <td><a href="#">Update Contact Information</a></td>
    //   <td>Please submit your annual Program Application by the Due Date</td>
    // </tr>
    // <tr class="table-danger">
    //   <th scope="row">4</th>
    //   <td>Update Contact Information</td>
    //   <td>Late</td>
    //   <td>2019-06-11</td>
    //   <td><a href="#">Complete Form</a></td>
    //   <td>Please submit your annual Program Application by the Due Date</td>
    // </tr>
    return of(t);
  }
}

import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { iProgramApplication } from '../../../core/models/program-application.class';
import { iHours } from 'src/app/core/models/hours.class';

@Component({
  selector: 'app-program-summary-table',
  templateUrl: './program-summary-table.component.html',
  styleUrls: ['./program-summary-table.component.css']
})
export class ProgramSummaryTableComponent implements OnInit {
  @Input() pa: iProgramApplication;
  operationsSum: number;
  standbySum: number;
  constructor() { }

  ngOnInit() {
    if (this.pa.operationHours) {
      this.operationsSum = this.pa.operationHours.map((h: iHours) => {
        // check that an open and closed time exist
        if (h.open && h.closed) {

          // convert moment hours into moment
          const open: moment.Moment = moment().hours(Number(h.open.split(':')[0])).minutes(Number(h.open.split(':')[1]));
          const closed: moment.Moment = moment().hours(Number(h.closed.split(':')[0])).minutes(Number(h.closed.split(':')[1]));

          console.log('before', closed);
          // if the open hours is after the closing time add a day to the closing time
          // a suicide hotline that starts at 23:00 and closes at 02:00 is open for 3 hours not a negative amount of hours
          if (closed.diff(open) < 0) {
            closed.add(1, 'days');
          }
          console.log('after', closed);

          // figure out how long the gap is between open times
          const daily: number = closed.diff(open, 'hours');
          let total = 0;
          if (h.monday) total = total + daily;
          if (h.tuesday) total = total + daily;
          if (h.wednesday) total = total + daily;
          if (h.friday) total = total + daily;
          if (h.saturday) total = total + daily;
          if (h.sunday) total = total + daily;
          // for each day of service add the hourly amount
          return total;
        } else {
          // there is not an open and a closed to add
          return 0
        }
      }).reduce((prev, curr) => prev += curr);
    }
  }
}

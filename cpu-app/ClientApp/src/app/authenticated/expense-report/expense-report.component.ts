import { Component, OnInit } from '@angular/core';
import { ExpenseReportService } from '../../core/services/expense-report.service';
import { StateService } from '../../core/services/state.service';
import { TransmogrifierExpenseReport } from '../../core/models/transmogrifier-expense-report.class';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit {

  // expense report
  er: TransmogrifierExpenseReport;

  constructor(
    private expenseReportService: ExpenseReportService,
    private stateService: StateService,
  ) { }

  ngOnInit() {

    this.expenseReportService.getScheduleG("e480dbe7-a910-ea11-b810-005056830319").subscribe(g =>
      this.er = new TransmogrifierExpenseReport(g));
  }
}

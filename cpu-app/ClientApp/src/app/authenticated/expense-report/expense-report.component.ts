import { Component, OnInit } from '@angular/core';
import { ExpenseReportService } from '../../core/services/expense-report.service';
import { TransmogrifierExpenseReport } from '../../core/models/transmogrifier-expense-report.class';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit {
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  discriminators: string[] = ['salary_benefits', 'program_expense', 'authorization']

  // expense report
  er: TransmogrifierExpenseReport;

  constructor(
    private expenseReportService: ExpenseReportService,
    private stepperService: IconStepperService
  ) { }

  ngOnInit() {
    // get the expense report to fill
    this.expenseReportService.getScheduleG("e480dbe7-a910-ea11-b810-005056830319").subscribe(g =>
      this.er = new TransmogrifierExpenseReport(g));
    // construct the stepper
    this.constructDefaultstepperElements();
    // Subscribe to the stepper elements
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);

  }
  constructDefaultstepperElements() {
    // write the default beginning
    [
      {
        itemName: 'Salary, benefits, program delivery and administration expense',
        formState: 'untouched',
        object: null,
        discriminator: 'salary_benefits',
      },
      {
        itemName: 'Program expense',
        formState: 'untouched',
        object: null,
        discriminator: 'program_expense',
      },
      {
        itemName: 'Authorization',
        formState: 'untouched',
        object: null,
        discriminator: 'authorization',
      }
    ].forEach((f: iStepperElement) => {
      this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
    });

    // put the page naviagation to the first page
    this.stepperService.setToFirstStepperElement();
  }
}

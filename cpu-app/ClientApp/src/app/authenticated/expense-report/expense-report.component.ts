import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpenseReportService } from '../../core/services/expense-report.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { TransmogrifierExpenseReport } from '../../core/models/transmogrifier-expense-report.class';
import { iPerson } from '../../core/models/person.class';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit, OnDestroy {
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  discriminators: string[] = ['salary_benefits', 'program_expense', 'authorization']

  // for variable length line item sums
  lineItemSums = {
    annualBudgetSum: null,
    quarterlyBudgetSum: null,
    actualSum: null,
    quarterlyVarianceSum: null,
    annualVarianceSum: null,
  };

  // expense report
  er: TransmogrifierExpenseReport;
  currentUser: iPerson;

  constructor(
    private expenseReportService: ExpenseReportService,
    private stepperService: IconStepperService,
    private stateService: StateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.stateService.currentUser.subscribe(u => this.currentUser = u);
    // get the expense report to fill
    this.expenseReportService.getScheduleG("e480dbe7-a910-ea11-b810-005056830319").subscribe(g => {
      this.er = new TransmogrifierExpenseReport(g);
      this.calculateLineItemSums();
    });
    // construct the stepper
    this.constructDefaultstepperElements();
    // Subscribe to the stepper elements
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
  }
  ngOnDestroy() {
    // clean the stepper
    this.stepperService.reset();
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


  calculateLineItemSums() {
    //annual budgeted amount
    this.lineItemSums['annualBudgetSum'] = this.er.expenseReport.programExpenseLineItems
      .map(l => l.annualBudget)
      .reduce((prev, curr) => prev + curr);
    //quarterly budgeted amount
    this.lineItemSums['quarterlyBudgetSum'] = this.er.expenseReport.programExpenseLineItems
      .map(l => l.quarterlyBudget)
      .reduce((prev, curr) => prev + curr);
    //actual expendatures this quarter
    this.lineItemSums['actualSum'] = this.er.expenseReport.programExpenseLineItems
      .map(l => l.actual)
      .reduce((prev, curr) => prev + curr);
    //quarterly variance
    this.lineItemSums['quarterlyVarianceSum'] = this.lineItemSums['annualBudgetSum'] * 0.25 - this.lineItemSums['actualSum'];
    //YTD variance
    this.lineItemSums['annualVarianceSum'] = this.lineItemSums['annualBudgetSum'] - this.lineItemSums['actualSum'];
  }
  updateLineItemSums() {
    //actual expendatures this quarter
    this.lineItemSums['actualSum'] = this.er.expenseReport.programExpenseLineItems
      .map(l => l.actual)
      .reduce((prev, curr) => prev + curr);
    //quarterly variance
    this.lineItemSums['quarterlyVarianceSum'] = this.lineItemSums['annualBudgetSum'] * 0.25 - this.lineItemSums['actualSum'];
    //YTD variance
    this.lineItemSums['annualVarianceSum'] = this.lineItemSums['annualBudgetSum'] - this.lineItemSums['actualSum'];
  }
  save() {
    // // make a person array to submit
    // const cleanup: Person[] = this.stepperElements.map(s => s.object as iPerson);
    // const post = DynamicsPostUsers(this.stateService.userId.getValue(), this.stateService.organizationId.getValue(), cleanup);
    // // console.log(post);
    // this.personService.setPersons(post).subscribe(
    //   () => {
    //     this.notificationQueueService.addNotification('Personnel Saved', 'success');
    //     // refresh the list of people on save
    //     this.stateService.refresh();
    //   },
    //   err => this.notificationQueueService.addNotification(err, 'danger')
    // );
  }
  exit() {
    if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
}

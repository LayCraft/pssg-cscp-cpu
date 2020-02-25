import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpenseReportService } from '../../core/services/expense-report.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { TransmogrifierExpenseReport } from '../../core/models/transmogrifier-expense-report.class';
import { iPerson } from '../../core/models/person.interface';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { FormHelper } from '../../core/form-helper';

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
  saving: boolean = false;

  // for variable length line item sums
  lineItemSums = {
    annualBudgetSum: null,
    quarterlyBudgetSum: null,
    actualSum: null,
    quarterlyVarianceSum: null,
    annualVarianceSum: null,
  };

  // expense report
  trans: TransmogrifierExpenseReport;
  data: any;
  currentUser: iPerson;

  private formHelper = new FormHelper();

  constructor(
    private expenseReportService: ExpenseReportService,
    private stepperService: IconStepperService,
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationQueueService: NotificationQueueService
  ) { }

  ngOnInit() {
    // collect current user from the user state.
    this.stateService.currentUser.subscribe(u => this.currentUser = u);
    this.route.params.subscribe(p => {
      // collect information for collecting the data
      const organizationId: string = this.stateService.main.getValue().organizationId;
      const userId: string = this.stateService.main.getValue().userId;

      // get the expense report to fill
      this.expenseReportService.getExpenseReport(organizationId, userId, p['taskId']).subscribe(
        g => {
          if (!g.IsSuccess) {
            // notify the user of a system error
            this.notificationQueueService.addNotification('An attempt at getting this expense report was unsuccessful. If this problem persists please notify your ministry contact.', 'danger');
            console.log(`IsSuccess was returned false when attempting to get Organization:${organizationId} User:${userId} Task:${p['taskId']} from the expense report API on OpenShift. The most likely cause is that the Dynamics data has changed, the Dynamics API has a bug, or the mapping of data requires modification to accomodate a change.`);
            // route back to the dashboard
            this.router.navigate(['/authenticated/dashboard']);
          } else {
            this.data = g;
            // make the transmogrifier for this form
            this.trans = new TransmogrifierExpenseReport(g);
            // construct the stepper
            this.constructDefaultstepperElements();
            // initial calculations with whatever comes from the server
            this.calculateLineItemSums();
          }
        }
      );
    });

    // Subscribe to the stepper elements
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
  }

  constructDefaultstepperElements() {
    // clean out the old things that might be living in the stepper.
    this.stepperService.reset();
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
    this.lineItemSums['annualBudgetSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.annualBudget)
      .reduce((prev, curr) => prev + curr);
    //quarterly budgeted amount
    this.lineItemSums['quarterlyBudgetSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.quarterlyBudget)
      .reduce((prev, curr) => prev + curr);
    //actual expendatures this quarter
    this.lineItemSums['actualSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.actual)
      .reduce((prev, curr) => prev + curr);
    //quarterly variance
    this.lineItemSums['quarterlyVarianceSum'] = this.lineItemSums['annualBudgetSum'] * 0.25 - this.lineItemSums['actualSum'];
    //YTD variance
    this.lineItemSums['annualVarianceSum'] = this.lineItemSums['annualBudgetSum'] - this.lineItemSums['actualSum'];
  }
  updateLineItemSums() {
    //actual expendatures this quarter
    this.lineItemSums['actualSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.actual)
      .reduce((prev, curr) => prev + curr);
    //quarterly variance
    this.lineItemSums['quarterlyVarianceSum'] = this.lineItemSums['annualBudgetSum'] * 0.25 - this.lineItemSums['actualSum'];
    //YTD variance
    this.lineItemSums['annualVarianceSum'] = this.lineItemSums['annualBudgetSum'] - this.lineItemSums['actualSum'];
  }
  save() { 
    //TODO
    // if (!this.formHelper.isFormValid(this.notificationQueueService)) {
    //   return;
    // }
    this.saving = true;




    this.saving = false;
  }
  exit() {
    if (this.formHelper.isFormDirty() && confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
    else {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
}

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ExpenseReportService } from '../../core/services/expense-report.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { TransmogrifierExpenseReport } from '../../core/models/transmogrifier-expense-report.class';
import { iPerson } from '../../core/models/person.interface';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { FormHelper } from '../../core/form-helper';
import { convertExpenseReportToDynamics } from '../../core/models/converters/expense-report-to-dynamics';
import { iDynamicsPostScheduleG } from '../../core/models/dynamics-post';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { AbstractControl } from '@angular/forms';
import { perTypeDict } from '../../core/constants/per-type';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit, OnDestroy {
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  stepperIndex: number = 0;
  discriminators: string[] = ['salary_benefits', 'program_expense', 'authorization']
  saving: boolean = false;

  // for variable length line item sums
  lineItemSums = {
    annualBudgetSum: null,
    quarterlyBudgetSum: null,
    actualSum: null,
    quarterlyVarianceSum: null,
    actualYearToDateSum: null,
    annualVarianceSum: null,
  };

  //org/program info
  mainTrans: Transmogrifier;
  contractNumber: string;

  // expense report
  trans: TransmogrifierExpenseReport;
  data: any;
  out: iDynamicsPostScheduleG;
  currentUser: iPerson;
  perType: string;

  public formHelper = new FormHelper();
  private stateSubscription: Subscription;

  constructor(
    private ref: ChangeDetectorRef,
    private expenseReportService: ExpenseReportService,
    private stepperService: IconStepperService,
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationQueueService: NotificationQueueService
  ) { }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  ngOnInit() {
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      // save the transmogrifier
      this.mainTrans = m;
    });
    // collect current user from the user state.
    this.stateService.currentUser.subscribe(u => this.currentUser = u);
    this.route.params.subscribe(p => {
      // collect information for collecting the data
      const organizationId: string = this.stateService.main.getValue().organizationId;
      const userId: string = this.stateService.main.getValue().userId;

      // get the expense report to fill
      this.expenseReportService.getExpenseReport(organizationId, userId, p['taskId']).subscribe(
        (g: any) => {
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

            this.perType = perTypeDict[this.trans.expenseReport.perType];

            console.log("from dynamics");
            console.log(g);
            console.log("trans");
            console.log(this.trans);

            this.contractNumber = this.mainTrans.contracts.find(c => c.contractId === g.Contract.vsd_contractid).contractNumber;
            // construct the stepper
            this.constructDefaultstepperElements();
            // initial calculations with whatever comes from the server
            this.calculateLineItemSums();
          }
        }
      );
    });

    // Subscribe to the stepper elements
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
    this.stepperService.currentStepperElement.subscribe(e => {
      if (this.currentStepperElement) {
        let originalStepper = _.cloneDeep(this.currentStepperElement);
        let formState = this.formHelper.getFormState();

        if (originalStepper.formState === "complete" && formState === "untouched") {
          //do nothing...
        }
        else if (originalStepper.formState !== "incomplete" || formState !== "untouched") {
          this.currentStepperElement.formState = formState;
        }
      }
      this.currentStepperElement = e;

      if (this.currentStepperElement && this.stepperElements) {
        this.stepperIndex = this.stepperElements.findIndex(e => e.id === this.currentStepperElement.id);
      }
    });
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
    this.lineItemSums['quarterlyVarianceSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.quarterlyBudget - l.actual)
      .reduce((prev, curr) => prev + curr);
    // //Actual YTD sum
    this.lineItemSums['actualYearToDateSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.actualYearToDate + l.actual)
      .reduce((prev, curr) => prev + curr);
    // //YTD variance
    this.lineItemSums['annualVarianceSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.annualBudget - (l.actualYearToDate + l.actual))
      .reduce((prev, curr) => prev + curr);
  }
  updateLineItemSums() {
    //actual expendatures this quarter
    this.lineItemSums['actualSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.actual)
      .reduce((prev, curr) => prev + curr);
    //quarterly variance
    this.lineItemSums['quarterlyVarianceSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.quarterlyBudget - l.actual)
      .reduce((prev, curr) => prev + curr);
    // //Actual YTD sum
    this.lineItemSums['actualYearToDateSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.actualYearToDate + l.actual)
      .reduce((prev, curr) => prev + curr);
    // //YTD variance
    this.lineItemSums['annualVarianceSum'] = this.trans.expenseReport.programExpenseLineItems
      .map(l => l.annualBudget - (l.actualYearToDate + l.actual))
      .reduce((prev, curr) => prev + curr);
  }
  save(shouldExit: boolean = false) {
    return new Promise((resolve, reject) => {
      try {
        if (!this.formHelper.isFormValid(this.notificationQueueService)) {
          resolve();
          return;
        }
        this.saving = true;
        console.log(this.trans);
        this.out = convertExpenseReportToDynamics(this.trans);
        console.log(this.out);
        this.expenseReportService.setExpenseReport(this.out).subscribe(
          r => {
            console.log(r);
            this.notificationQueueService.addNotification(`You have successfully saved the expense report.`, 'success');
            this.stateService.refresh();
            if (shouldExit) this.router.navigate(['/authenticated/dashboard']);
            this.saving = false;
            this.stepperElements.forEach(s => {
              if (s.formState === 'complete') return;
              this.stepperService.setStepperElementProperty(s.id, "formState", "untouched");
            });
            this.formHelper.makeFormClean();
            resolve();
          },
          err => {
            console.log(err);
            this.notificationQueueService.addNotification('The expense report could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
            this.saving = false;
            reject();
          }
        );
      }
      catch (err) {
        console.log(err);
        this.notificationQueueService.addNotification('The expense report could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
        this.saving = false;
        reject();
      }
    });
  }
  exit() {
    if (this.formHelper.isFormDirty()) {
      if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
        this.stateService.refresh();
        this.router.navigate(['/authenticated/dashboard']);
      }
    }
    else {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
  }

  setNextStepper() {
    let originalStepper = _.cloneDeep(this.currentStepperElement);
    
    if (!this.trans.expenseReport.executiveReview) {
      setTimeout(() => {
        this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'saving');
      }, 0);

      this.save(false).then(() => {
        this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'complete');
      }).catch(() => {
        this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'invalid');
      });
    }

    ++this.stepperIndex;

    //default to first sub tab
    this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);

  }

  setPreviousStepper() {
    --this.stepperIndex;

    //default to first sub tab
    this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
  }
}

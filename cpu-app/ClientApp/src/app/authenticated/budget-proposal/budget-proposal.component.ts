import { ActivatedRoute, Router } from '@angular/router';
import { BudgetProposalService } from '../../core/services/budget-proposal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { StateService } from '../../core/services/state.service';
import { TransmogrifierBudgetProposal } from '../../core/models/transmogrifier-budget-proposal.class';
import { iDynamicsBudgetProposal } from '../../core/models/dynamics-blob';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { nameAssemble } from '../../core/constants/name-assemble';
import { convertBudgetProposalToDynamics } from '../../core/models/converters/budget-proposal-to-dynamics';
import { iProgramBudget } from '../../core/models/program-budget.interface';
import { iDynamicsPostBudgetProposal } from '../../core/models/dynamics-post';
import { FormHelper } from '../../core/form-helper';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import * as _ from 'lodash';
import { RevenueSource } from '../../core/models/revenue-source.class';
import { revenueSourceTypes } from '../../core/constants/revenue-source-type';
import { Subscription } from 'rxjs';
import { VSCP_APPROVED_SOURCE_NAME } from '../../core/models/revenue-source.interface';

@Component({
  selector: 'app-budget-proposal',
  templateUrl: './budget-proposal.component.html',
  styleUrls: ['./budget-proposal.component.css']
})
export class BudgetProposalComponent implements OnInit, OnDestroy {
  // used for the stepper component
  currentStepperElement: iStepperElement;
  stepperElements: iStepperElement[];
  stepperIndex: number = 0;

  mainTrans: Transmogrifier;
  contractNumber: string;
  trans: TransmogrifierBudgetProposal;
  data: iDynamicsBudgetProposal;
  out: iDynamicsPostBudgetProposal;
  saving: boolean = false;
  isCompleted: boolean = false;

  private stateSubscription: Subscription;

  programBudgetTabs = ['Program Revenue Information', 'Program Expense'];
  current_program_budget: iProgramBudget = null;

  personDict: object = {};
  private formHelper = new FormHelper();
  constructor(
    private budgetProposalService: BudgetProposalService,
    private notificationQueueService: NotificationQueueService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private stepperService: IconStepperService,
  ) { }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(q => {
      if (q && q.completed) {
        this.isCompleted = q.completed == "true";
      }
    });

    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      // save the transmogrifier
      this.mainTrans = m;
    });
    // make a dictionary of names
    this.personDict = this.stateService.main.getValue().persons
      .map(p => {
        const tmp = {};
        tmp[p.personId] = nameAssemble(p.firstName, p.middleName, p.lastName);
        return tmp;
      })
      .reduce((prev, curr) => {
        return { ...prev, ...curr }
      });
    // collect the correct budget proposal
    this.route.params.subscribe(p => {
      // collect the current user information from the state.
      const userId: string = this.stateService.main.getValue().userId;
      const organizationId: string = this.stateService.main.getValue().organizationId;

      // get the budget proposal from the budget proposal service.
      this.budgetProposalService.getBudgetProposal(organizationId, userId, p['taskId']).subscribe(d => {
        if (!d.IsSuccess) {
          this.data = d;
          // notify the user of a system error
          this.notificationQueueService.addNotification('An attempt at getting this budget proposal form was unsuccessful. If the problem persists please notify your ministry contact.', 'danger');
          // console.log(`IsSuccess was returned false when attempting to get Organization:${organizationId} User:${userId} Task:${p['taskId']} from the budget proposal API on OpenShift. The most likely cause is that the Dynamics data has changed, the Dynamics API has a bug, or the mapping of data requires modification to accomodate a change.`);

          // route back to the dashboard
          this.router.navigate(['/authenticated/dashboard']);
        } else {
          this.data = d;
          // make the transmogrifier for this form
          this.trans = new TransmogrifierBudgetProposal(d);
          this.trans.programBudgets = this.trans.programBudgets.map((pb: iProgramBudget): iProgramBudget => {
            this.contractNumber = this.mainTrans.contracts.find(c => c.contractId === d.Contract.vsd_contractid).contractNumber;
            return pb;
          });

          // console.log("dynamics data:");
          // console.log(d);
          // console.log("trans");
          // console.log(this.trans);
          this.constructDefaultstepperElements();
        }
      });
    })
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
    this.stepperService.currentStepperElement.subscribe(e => {
      if (this.currentStepperElement) {
        let originalStepper = _.cloneDeep(this.currentStepperElement);
        let formState = this.formHelper.getFormState();

        if ((originalStepper.formState === "complete" && formState === "untouched") || originalStepper.formState === "invalid") {
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

      if (this.trans && this.trans.programBudgets && this.trans.programBudgets.length > 0 && this.currentStepperElement && this.currentStepperElement.discriminator) {
        this.current_program_budget = this.trans.programBudgets.find(pb => pb.programId === this.currentStepperElement.discriminator);
      }
    });
  }

  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      return true;
    }
    return false;
  }
  constructDefaultstepperElements() {
    this.stepperService.reset();
    // add the program overview
    this.stepperService.addStepperElement(null, 'Overview', 'info', 'program_overview');
    // add the budget navigation for each item
    this.trans.programBudgets.forEach(pb => this.stepperService.addStepperElement(null, pb.name, 'untouched', pb.programId));

    if (!this.isCompleted) {
      // add the authorization page
      this.stepperService.addStepperElement(null, 'Authorization', 'untouched', 'authorization');
    }
    // set the stepper to the first item
    this.stepperService.setToFirstStepperElement();
  }
  save(shouldExit: boolean = false) {
    return new Promise((resolve, reject) => {
      try {// if (!this.formHelper.isFormValid(this.notificationQueueService)) {
        let originalStepper = _.cloneDeep(this.currentStepperElement);
        let currentTabHasInvalidClass = originalStepper.formState === "invalid" ? 1 : 0;
        if (!this.formHelper.isFormValid(this.notificationQueueService, currentTabHasInvalidClass)) {
          resolve();
          return;
        }

        //
        if (!this.validateProgramBudgets(this.trans.programBudgets)) {
          resolve();
          return;
        }
        //

        this.saving = true;
        // console.log(this.trans);
        this.out = convertBudgetProposalToDynamics(this.trans);
        // console.log("all pbs");
        // console.log(this.out);
        this.budgetProposalService.setBudgetProposal(this.out).subscribe(
          r => {
            // console.log(r);
            this.notificationQueueService.addNotification(`You have successfully saved the budget proposal.`, 'success');
            this.stateService.refresh();
            if (shouldExit) this.router.navigate(['/authenticated/dashboard']);
            this.saving = false;
            this.stepperElements.forEach(s => {
              if (s.formState === 'complete') return;
              this.stepperService.setStepperElementProperty(s.id, "formState", "untouched");
            });
            this.reloadBudgetProposal();
            this.formHelper.makeFormClean();
            resolve();
          },
          err => {
            console.log(err);
            this.notificationQueueService.addNotification('The budget proposal could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
            this.saving = false;
            reject();
          }
        );
      }
      catch (err) {
        console.log(err);
        this.notificationQueueService.addNotification('The budget proposal could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
        this.saving = false;
      }
    });
  }
  exit() {
    // if (this.formHelper.showWarningBeforeExit()) {
    //   if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
    //     this.stateService.refresh();
    //     this.router.navigate(['/authenticated/dashboard']);
    //   }
    // }
    // else {
    this.stateService.refresh();
    this.router.navigate(['/authenticated/dashboard']);
    // }
  }
  reloadBudgetProposal() {
    this.route.params.subscribe(p => {
      // collect the current user information from the state.
      const userId: string = this.stateService.main.getValue().userId;
      const organizationId: string = this.stateService.main.getValue().organizationId;

      // get the budget proposal from the budget proposal service.
      this.budgetProposalService.getBudgetProposal(organizationId, userId, p['taskId']).subscribe(d => {
        if (!d.IsSuccess) {
          this.data = d;
          // notify the user of a system error
          this.notificationQueueService.addNotification('An attempt at getting this budget proposal form was unsuccessful. If the problem persists please notify your ministry contact.', 'danger');
          // console.log(`IsSuccess was returned false when attempting to get Organization:${organizationId} User:${userId} Task:${p['taskId']} from the budget proposal API on OpenShift. The most likely cause is that the Dynamics data has changed, the Dynamics API has a bug, or the mapping of data requires modification to accomodate a change.`);

          // route back to the dashboard
          this.router.navigate(['/authenticated/dashboard']);
        } else {
          this.data = d;
          let tempTrans = new TransmogrifierBudgetProposal(d);

          for (let i = 0; i < this.trans.programBudgets.length; ++i) {
            tempTrans.programBudgets[i].currentTab = this.trans.programBudgets[i].currentTab;
            Object.assign(this.trans.programBudgets[i], tempTrans.programBudgets[i]);
            if (!this.trans.programBudgets[i].revenueSources.length) {
              let rev = new RevenueSource();
              rev.revenueSourceName = revenueSourceTypes[4];
              this.trans.programBudgets[i].revenueSources.push(rev);
            }
          }
        }
      });
    });

  }
  validateProgramBudgets(programBudgets: iProgramBudget[]) {
    let isValid = true;

    programBudgets.forEach((pb: iProgramBudget) => {
      let vscpApprovedAmount = 0;
      pb.revenueSources.filter(rs => rs.isActive).forEach(rs => {
        if (rs.revenueSourceName === VSCP_APPROVED_SOURCE_NAME) {
          vscpApprovedAmount += ((rs.cash || 0) + (rs.inKindContribution || 0));
        }
      });

      let totalFundedFromVSCP = 0;
      pb.salariesAndBenefits.filter(sb => sb.isActive).forEach(sb => {
        totalFundedFromVSCP += (sb.fundedFromVscp || 0);
      });
      pb.programDeliveryCosts.filter(pd => pd.isActive).forEach(pd => {
        totalFundedFromVSCP += (pd.fundedFromVscp || 0);
      });
      pb.programDeliveryOtherExpenses.filter(pd => pd.isActive).forEach(pd => {
        totalFundedFromVSCP += (pd.fundedFromVscp || 0);
      });
      pb.administrationCosts.filter(ac => ac.isActive).forEach(ac => {
        totalFundedFromVSCP += (ac.fundedFromVscp || 0);
      });
      pb.administrationOtherExpenses.filter(ac => ac.isActive).forEach(ac => {
        totalFundedFromVSCP += (ac.fundedFromVscp || 0);
      });

      if (vscpApprovedAmount !== totalFundedFromVSCP) {
        let stepperWithError = this.stepperElements.find(s => s.discriminator === pb.programId);
        if (stepperWithError) {
          this.stepperService.setStepperElementProperty(stepperWithError.id, "formState", "invalid");
        }
        isValid = false;
      }
    });

    if (!isValid) {
      this.notificationQueueService.addNotification(`The total VSCP funding must match the total component value outlined in Schedule B-Terms and Conditions of Payment.`, 'warning');
    }

    return isValid;
  }
  setNextStepper() {
    let ignoreTabErrors = true;
    let originalStepper = _.cloneDeep(this.currentStepperElement);

    let currentTabHasInvalidClass = originalStepper.formState === "invalid" ? 1 : 0;
    if (!this.formHelper.isFormValid(this.notificationQueueService, currentTabHasInvalidClass, ignoreTabErrors)) {
      // this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', this.formHelper.getFormState());
      return;
    }

    this.current_program_budget = this.trans.programBudgets.find(pb => pb.programId === originalStepper.discriminator);
    if (this.current_program_budget) {
      let index = this.programBudgetTabs.findIndex(t => t === this.current_program_budget.currentTab);
      if (index < (this.programBudgetTabs.length - 1)) {
        this.current_program_budget.currentTab = this.programBudgetTabs[index + 1];
        window.scrollTo(0, 0);
        return;
      }
    }

    if (this.current_program_budget && !this.validateProgramBudgets([this.current_program_budget])) {
      return;
    }

    if (originalStepper.discriminator === "program_overview" && !this.isCompleted) {
      //we're doing this set timeout stuff because "this" context isn't global and doesn't have access to the stepper element to update it's formState
      //in the set timeout function "this" becomes the global context that will get the stepper element
      setTimeout(() => {
        this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'complete');
      }, 0);
    }
    else if (!this.trans.signature.signatureDate && !this.isCompleted) {
      setTimeout(() => {
        this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'saving');
      }, 0);

      this.saveSingleProgramBudget(this.current_program_budget).then(() => {
        this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'complete');
      }).catch(() => {
        this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'invalid');
      });
    }
    ++this.stepperIndex;

    let nextStepper = this.stepperElements[this.stepperIndex];
    let next_program_budget = this.trans.programBudgets.find(pb => pb.programId === nextStepper.discriminator);
    if (next_program_budget) {
      next_program_budget.currentTab = this.programBudgetTabs[0];
    }

    this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
  }
  setPreviousStepper() {
    let current_program_budget = this.trans.programBudgets.find(pb => pb.programId === this.currentStepperElement.discriminator);
    if (current_program_budget) {
      let index = this.programBudgetTabs.findIndex(t => t === current_program_budget.currentTab);
      if (index > 0) {
        current_program_budget.currentTab = this.programBudgetTabs[index - 1];
        window.scrollTo(0, 0);
        return;
      }
    }

    --this.stepperIndex;

    let nextStepper = this.stepperElements[this.stepperIndex];
    let next_program_budget = this.trans.programBudgets.find(pb => pb.programId === nextStepper.discriminator);
    if (next_program_budget) {
      next_program_budget.currentTab = this.programBudgetTabs[this.programBudgetTabs.length - 1];
    }

    this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
  }


  saveSingleProgramBudget(programBudget: iProgramBudget) {
    return new Promise((resolve, reject) => {
      try {

        this.saving = true;
        // console.log(this.trans);
        let singleTrans = _.cloneDeep(this.trans);
        singleTrans.programBudgets = singleTrans.programBudgets.filter(pb => pb.programId === programBudget.programId);
        this.out = convertBudgetProposalToDynamics(singleTrans);

        // console.log("single program save");
        // console.log(this.out);
        this.budgetProposalService.setBudgetProposal(this.out).subscribe(
          r => {
            // console.log(r);
            this.stateService.refresh();
            this.saving = false;
            this.reloadBudgetProposal();
            resolve();
          },
          err => {
            console.log(err);
            this.notificationQueueService.addNotification('The budget proposal could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
            this.saving = false;
            reject();
          }
        );
      }
      catch (err) {
        console.log(err);
        this.notificationQueueService.addNotification('The budget proposal could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
        this.saving = false;
      }
    });
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { BudgetProposalService } from '../../core/services/budget-proposal.service';
import { Component, OnInit } from '@angular/core';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { StateService } from '../../core/services/state.service';
import { TransmogrifierBudgetProposal } from '../../core/models/transmogrifier-budget-proposal.class';
import { iDynamicsBudgetProposal } from '../../core/models/dynamics-blob';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { nameAssemble } from '../../core/constants/name-assemble';
import { convertBudgetProposalToDynamics } from '../../core/models/converters/budget-proposal-to-dynamics';

@Component({
  selector: 'app-budget-proposal',
  templateUrl: './budget-proposal.component.html',
  styleUrls: ['./budget-proposal.component.css']
})
export class BudgetProposalComponent implements OnInit {
  // used for the stepper component
  currentStepperElement: iStepperElement;
  stepperElements: iStepperElement[];

  trans: TransmogrifierBudgetProposal;
  data: iDynamicsBudgetProposal;
  personDict: object = {};
  constructor(
    private budgetProposalService: BudgetProposalService,
    private notificationQueueService: NotificationQueueService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private stepperService: IconStepperService,
  ) { }

  ngOnInit() {
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
      const userId: string = this.stateService.main.getValue().organizationMeta.userId;
      const organizationId: string = this.stateService.main.getValue().organizationMeta.organizationId;

      // get the budget proposal from the budget proposal service.
      this.budgetProposalService.getBudgetProposal(organizationId, userId, p['taskId']).subscribe(d => {
        if (!d.IsSuccess) {
          this.data = d;
          // notify the user of a system error
          this.notificationQueueService.addNotification('An attempt at getting this budget proposal form was unsuccessful. If the problem persists please notify your ministry contact.', 'danger');
          console.log(`IsSuccess was returned false when attempting to get Organization:${organizationId} User:${userId} Task:${p['taskId']} from the budget proposal API on OpenShift. The most likely cause is that the Dynamics data has changed, the Dynamics API has a bug, or the mapping of data requires modification to accomodate a change.`);

          // route back to the dashboard
          this.router.navigate(['/authenticated/dashboard']);
        } else {
          this.data = d;
          // make the transmogrifier for this form
          this.trans = new TransmogrifierBudgetProposal(d);
          this.constructDefaultstepperElements();
        }
      });
    })
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
  }

  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      // names match? must be the same. Makes the assumption that all names are unique.
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
    // add the authorization page
    this.stepperService.addStepperElement(null, 'Authorization', 'untouched', 'authorization');
    // set the stepper to the first item
    this.stepperService.setToFirstStepperElement();
  }
  save() {
    const send = convertBudgetProposalToDynamics(this.trans);
  }
  exit() {
    if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { IconStepperService, iStepperElement } from '../../shared/icon-stepper/icon-stepper.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusReportService } from '../../core/services/status-report.service';
import { TransmogrifierStatusReport } from '../../core/models/transmogrifier-status-report.class';
import { convertStatusReportToDynamics } from '../../core/models/converters/status-report-to-dynamics';
import { iDynamicsPostStatusReport } from '../../core/models/dynamics-post';
import { iQuestionCollection } from '../../core/models/question-collection.interface';
import { StateService } from '../../core/services/state.service';
import { FormHelper } from '../../core/form-helper';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.css']
})
export class StatusReportComponent implements OnInit {
  data: any;
  trans: TransmogrifierStatusReport;
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  saving: boolean = false;
  private formHelper = new FormHelper();
  constructor(
    private notificationQueueService: NotificationQueueService,
    private route: ActivatedRoute,
    private router: Router,
    private statusReportService: StatusReportService,
    private stateService: StateService,
    private stepperService: IconStepperService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      // collect information for collecting the data
      const organizationId: string = this.stateService.main.getValue().organizationId;
      const userId: string = this.stateService.main.getValue().userId;

      this.statusReportService.getStatusReportQuestions(organizationId, userId, p['taskId'])
        .subscribe(r => {
          if (!r.IsSuccess) {
            // notify the user of a system error
            this.notificationQueueService.addNotification('An attempt at getting this status report was unsuccessful. If this problem persists please notify your ministry contact.', 'danger');
            console.log(`IsSuccess was returned false when attempting to get Organization:${organizationId} User:${userId} Task:${p['taskId']} from the status report API on OpenShift. The most likely cause is that the Dynamics data has changed, the Dynamics API has a bug, or the mapping of data requires modification to accomodate a change.`);
            // route back to the dashboard
            this.router.navigate(['/authenticated/dashboard']);
          } else {
            // make the transmogrifier for this form
            this.data = r;
            // construct the stepper
            this.trans = new TransmogrifierStatusReport(r);
            console.log("dynamics data status report:");
            console.log(r);
            console.log("trans");
            console.log(this.trans);
            this.constructDefaultstepperElements();
          }
        });
    });

    // Subscribe to the stepper elements
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
  }
  constructDefaultstepperElements() {
    this.stepperService.reset();
    this.trans.statusReportQuestions
      // .sort((a, b) => {
      //   if (a.name < b.name) return -1;
      //   if (a.name > b.name) return 1;
      //   return 0;
      // })
      .map((srq: iQuestionCollection): iStepperElement => {
        return {
          itemName: srq.name,
          formState: 'untouched',
          object: null,
          discriminator: null,
        }
      })
      .forEach((f: iStepperElement) => {
        this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
      });
    // make the first element the selected one.
    this.stepperService.setToFirstStepperElement();
  }
  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      return true;
    }
    return false;
  }
  submit() {
    if (!this.trans.reportingPeriod) {
      alert('Please select a month before submitting.');
      return;
    }
    if (!this.formHelper.isFormValid(this.notificationQueueService)) {
      return;
    }
    if (confirm('I have confirmed that all of the figures are accurate to the best of my knowledge. I wish to submit these monthly figures for ' + this.trans.reportingPeriod + '.')) {
      // Convert the form to a postable format
      this.saving = true;
      const statusReport: iDynamicsPostStatusReport = convertStatusReportToDynamics(this.trans);
      // if they have not filled out the form don't submit it.
      if (!statusReport.AnswerCollection.length) {
        alert('Please ensure that you have filled out the statistics to the best of your ability before attempting to submit.');
        // break out of the function right here
        this.saving = false;
        return;
      }

      console.log(statusReport);

      // submit the answers
      this.statusReportService.setStatusReportAnswers(this.trans.programId, statusReport)
        .subscribe(
          r => {
            this.saving = false;
            console.log(r);
            this.notificationQueueService.addNotification(`You have successfully submitted ${this.trans.reportingPeriod} statistics.`, 'success');
            this.router.navigate(['/authenticated/dashboard']);
          },
          err => {
            this.saving = false;
            console.log(err);
            this.notificationQueueService.addNotification('Monthly statistics could not be submitted. If this problem is persisting please contact your ministry representative.', 'danger');
          }
        );
    }
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

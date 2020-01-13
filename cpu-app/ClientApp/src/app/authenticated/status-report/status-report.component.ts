import { Component, OnInit } from '@angular/core';
import { IconStepperService, iStepperElement } from '../../shared/icon-stepper/icon-stepper.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Router } from '@angular/router';
import { StatusReportService } from '../../core/services/status-report.service';
import { TransmogrifierStatusReport } from '../../core/models/transmogrifier-status-report.class';
import { convertStatusReportToDynamics } from '../../core/models/converters/status-report-to-dynamics';
import { iDynamicsPostStatusReport } from '../../core/models/dynamics-post';
import { iQuestionCollection } from '../../core/models/question-collection.interface';

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
  constructor(
    private notificationQueueService: NotificationQueueService,
    private router: Router,
    private statusReportService: StatusReportService,
    private stepperService: IconStepperService,
  ) { }

  ngOnInit() {
    this.statusReportService.getStatusReportQuestions('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4', '0e309304-c4e6-e911-b811-00505683fbf4')
      .subscribe(r => {
        this.data = r;
        this.trans = new TransmogrifierStatusReport(r);
        this.constructDefaultstepperElements();
      });

    // stay in sync with
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
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
    if (confirm('I have confirmed that all of the figures are accurate to the best of my knowledge. I wish to submit these monthly figures for ' + this.trans.reportingPeriod + '.')) {
      // Convert the form to a postable format
      const statusReport: iDynamicsPostStatusReport = convertStatusReportToDynamics(this.trans);
      // if they have not filled out the form don't submit it.
      if (!statusReport.AnswerCollection.length) {
        alert('Please ensure that you have filled out the statistics to the best of your ability before attempting to submit.');
        // break out of the function right here
        return;
      }

      // submit the answers
      this.statusReportService.setStatusReportAnswers(this.trans.programId, statusReport)
        .subscribe(
          r => {
            console.log(r);
            this.notificationQueueService.addNotification(`You have successfully submitted ${this.trans.reportingPeriod} statistics.`, 'success');
            this.router.navigate(['/authenticated/dashboard']);
          },
          err => {
            console.log(err);
            this.notificationQueueService.addNotification('Monthly statistics could not be submitted. If this problem is persisting please contact your ministry representative.', 'danger');
          }
        );
    }
  }
  exit() {
    if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
      this.router.navigate(['/authenticated/dashboard']);
    }
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
}

import { Component, OnInit } from '@angular/core';
import { IconStepperService, iStepperElement } from '../../shared/icon-stepper/icon-stepper.service';
import { StatusReportService } from '../../core/services/status-report.service';
import { TransmogrifierStatusReport } from '../../core/models/transmogrifier-status-report.class';
import { iQuestionCollection } from '../../core/models/question-collection.interface';
import { convertStatusReportToDynamics } from '../../core/models/converters/status-report-to-dynamics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.css']
})
export class StatusReportComponent implements OnInit {
  response: any;
  trans: TransmogrifierStatusReport;
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  constructor(
    private stepperService: IconStepperService,
    private statusReportService: StatusReportService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.statusReportService.getStatusReportQuestions('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4', '0e309304-c4e6-e911-b811-00505683fbf4')
      .subscribe(r => {
        this.response = r;
        this.trans = new TransmogrifierStatusReport(r);
        this.trans.reportingPeriod = "January";
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
    if (this.trans.reportingPeriod && confirm('I have confirmed that all of the figures are accurate to the best of my knowledge. I wish to submit these monthly figures for ' + this.trans.reportingPeriod + '.')) {
      // send the stuff
      this.statusReportService.setStatusReportAnswers(this.trans.programId, convertStatusReportToDynamics(this.trans))
        .subscribe(r => this.response = r);
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

import { Component, OnInit } from '@angular/core';
import { IconStepperService, iStepperElement } from '../../shared/icon-stepper/icon-stepper.service';
import { StatusReportService } from '../../core/services/status-report.service';
import { TransmogrifierStatusReport } from '../../core/models/transmogrifier-status-report.class';

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
  ) { }

  ngOnInit() {
    this.statusReportService.getStatusReportQuestions('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4', '0e309304-c4e6-e911-b811-00505683fbf4')
      .subscribe(r => {
        this.response = r;
        this.trans = new TransmogrifierStatusReport(r);
      });
    // clear all of the old stepper elements
    this.constructDefaultstepperElements();
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

  constructDefaultstepperElements() {
    this.stepperService.reset();
    // write the default beginning
    [
      {
        itemName: 'Program Questions',
        formState: 'untouched',
        object: null,
        discriminator: 'program_questions',
      },
      {
        itemName: 'Program Statistics',
        formState: 'untouched',
        object: null,
        discriminator: 'program_statistics',
      },
      {
        itemName: 'New Client Information',
        formState: 'untouched',
        object: null,
        discriminator: 'new_client_information',
      },
      {
        itemName: 'Referrals Information',
        formState: 'untouched',
        object: null,
        discriminator: 'referrals_information',
      },
      {
        itemName: 'Services Provided',
        formState: 'untouched',
        object: null,
        discriminator: 'services_provided',
      },
    ].forEach((f: iStepperElement) => {
      this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
    });
  }
}

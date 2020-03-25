import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { ProgramApplicationService } from '../../core/services/program-application.service';
import { StateService } from '../../core/services/state.service';
import { TransmogrifierProgramApplication } from '../../core/models/transmogrifier-program-application.class';
import { iProgramApplication } from '../../core/models/program-application.interface';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { convertProgramApplicationToDynamics } from '../../core/models/converters/program-application-to-dynamics';
import { FormHelper } from '../../core/form-helper';
import { iDynamicsPostScheduleF } from '../../core/models/dynamics-post';
import * as _ from 'lodash';

@Component({
  selector: 'app-program-application',
  templateUrl: './program-application.component.html',
  styleUrls: ['./program-application.component.css']
})
export class ProgramApplicationComponent implements OnInit {
  data: any;
  out: iDynamicsPostScheduleF;
  trans: TransmogrifierProgramApplication;
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  stepperIndex: number = 0;

  discriminators: string[] = ['contact_information', 'administrative_information', 'commercial_general_liability_insurance', 'program', 'review_application', 'authorization'];
  saving: boolean = false;

  private formHelper = new FormHelper();

  constructor(
    private notificationQueueService: NotificationQueueService,
    private programApplicationService: ProgramApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private stepperService: IconStepperService,
    public ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    // get the right contract by route
    this.route.params.subscribe(p => {
      // collect the current user information from the state.
      const userId: string = this.stateService.main.getValue().userId;
      const organizationId: string = this.stateService.main.getValue().organizationId;
      // get the program application to fill
      this.programApplicationService.getProgramApplication(organizationId, userId, p['taskId']).subscribe(
        f => {
          if (!f.IsSuccess) {
            // notify the user of a system error
            this.notificationQueueService.addNotification('An attempt at getting this program application form was unsuccessful. If the problem persists please notify your ministry contact.', 'danger');
            console.log(`IsSuccess was returned false when attempting to get Organization:${organizationId} User:${userId} Contract:${p['taskId']} from the program application API on OpenShift. The most likely cause is that the Dynamics data has changed, the Dynamics API has a bug, or the mapping of data requires modification to accomodate a change.`);

            // route back to the dashboard
            this.router.navigate(['/authenticated/dashboard']);
          } else {
            this.data = f;
            console.log("program application dynamics info");
            console.log(f);

            // make the transmogrifier for this form
            this.trans = new TransmogrifierProgramApplication(f);
            console.log("Program application transmogrifier");
            console.log(this.trans);

            this.constructDefaultstepperElements(this.trans);
          }
        }
      );
    });
    // subscribe to the stepper state
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

  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      return true;
    }
    return false;
  }
  constructDefaultstepperElements(m: TransmogrifierProgramApplication) {
    // clean out the old things that might be living in the stepper.
    this.stepperService.reset();
    // write the default beginning
    [
      {
        itemName: 'Applicant Contact Information',
        formState: 'untouched',
        object: null,
        discriminator: 'contact_information',
      },
      {
        itemName: 'Applicant Administrative Information',
        formState: 'untouched',
        object: null,
        discriminator: 'administrative_information',
      },
      {
        itemName: 'Commercial General Liability Insurance',
        formState: 'untouched',
        object: null,
        discriminator: 'commercial_general_liability_insurance',
      },
    ].forEach((f: iStepperElement) => {
      this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
    });

    // if there are no program applications what are we doing here?
    if (!this.trans.programApplications.length) {
      this.stepperService.addStepperElement(null, 'Program Application Does Not Include Programs', 'invalid');
      this.notificationQueueService.addNotification('A program application should always have a program attached. This is a problem with the data held by the ministry. Please contact your ministry representative and let them know that this has occured and that you cannot complete your program application.', 'danger', 99999999);
    }

    // add the programs to the list
    this.trans.programApplications.forEach((p: iProgramApplication) => {
      this.stepperService.addStepperElement({ programId: p.programId }, p.name, 'untouched', 'program');
    });
    // Write the default end part
    [
      {
        itemName: 'Review Program Application',
        formState: 'untouched',
        object: null,
        discriminator: 'review_application',
      },
      {
        itemName: 'Authorization',
        formState: 'untouched',
        object: null,
        discriminator: 'authorization',
      },
    ].forEach((f: iStepperElement) => {
      this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
    });
    // put the page naviagation to the first page
    this.stepperService.setToFirstStepperElement();
  }
  save(showNotification: boolean = true) {
    return new Promise((resolve, reject) => {
      if (!this.formHelper.isFormValid(this.notificationQueueService)) {
        resolve();
        return;
      }
      this.saving = true;
      console.log("saving...");
      console.log(this.trans);
      this.out = convertProgramApplicationToDynamics(this.trans);
      this.programApplicationService.setProgramApplication(this.out).subscribe(
        r => {
          console.log(r);
          if (showNotification) {
            this.notificationQueueService.addNotification(`You have successfully saved the program application.`, 'success');
          }
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
          this.notificationQueueService.addNotification('The program application could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
          this.saving = false;
          reject();
        }
      );
    });
  }
  exit() {
    if (this.formHelper.showWarningBeforeExit()) {
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
  submit() {
    if (!this.formHelper.isFormValid(this.notificationQueueService)) {
      return;
    }
    this.saving = true;
    this.out = convertProgramApplicationToDynamics(this.trans);
    this.programApplicationService.setProgramApplication(this.out).subscribe(
      r => {
        console.log(r);

        this.notificationQueueService.addNotification(`You have successfully submitted the program application.`, 'success');
        this.saving = false;
        this.stateService.refresh();
        this.router.navigate(['/authenticated/dashboard']);
      },
      err => {
        console.log(err);
        this.notificationQueueService.addNotification('The program application could not be submitted. If this problem is persisting please contact your ministry representative.', 'danger');
        this.saving = false;
      }
    );
  }
  setNextStepper() {
    let originalStepper = _.cloneDeep(this.currentStepperElement);
    if (!this.formHelper.isFormValid(this.notificationQueueService)) {
      // this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', this.formHelper.getFormState());
      return;
    }

    if (!this.trans.signature.signatureDate) {
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
    this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
  }
  setPreviousStepper() {
    --this.stepperIndex;
    this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
  }
}
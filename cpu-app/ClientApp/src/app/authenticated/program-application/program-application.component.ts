import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { iProgramApplication } from '../../core/models/program-application.class';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { ProgramApplicationService } from '../../core/services/program-application.service';
import { TransmogrifierProgramApplication } from '../../core/models/transmogrifier-program-application.class';

@Component({
  selector: 'app-program-application',
  templateUrl: './program-application.component.html',
  styleUrls: ['./program-application.component.css']
})
export class ProgramApplicationComponent implements OnInit, OnDestroy {

  trans: TransmogrifierProgramApplication;
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  discriminators: string[] = ['contact_information', 'administrative_information', 'commercial_general_liability_insurance', 'program', 'review_application', 'authorization'];
  constructor(
    private programApplicationService: ProgramApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private stepperService: IconStepperService,
  ) { }

  ngOnInit() {
    // get the right contract by route
    this.route.params.subscribe(p => {
      this.programApplicationService.getScheduleF(p['contractId']).subscribe(f => {
        // make the transmogrifier for this form
        this.trans = new TransmogrifierProgramApplication(f);
        this.constructDefaultstepperElements(this.trans);
      });
    });
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
  }
  ngOnDestroy() {
    // clean the stepper
    this.stepperService.reset();
  }

  programApplicationUpdated(programApplication: iProgramApplication): void {
    // handle the updates to the program budget. Write it out to a service or whatever
    console.log("The program application:", programApplication);
  }

  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      return true;
    }
    return false;
  }
  constructDefaultstepperElements(trans: TransmogrifierProgramApplication) {
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

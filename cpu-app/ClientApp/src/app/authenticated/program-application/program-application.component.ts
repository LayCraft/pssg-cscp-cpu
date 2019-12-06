import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrativeInformation } from '../../core/models/administrative-information.class';
import { ContactInformation } from '../../core/models/contact-information.class';
import { StateService } from '../../core/services/state.service';
import { iContract } from '../../core/models/contract';
import { iProgram } from '../../core/models/program';
import { iProgramApplication, ProgramApplication } from '../../core/models/program-application.class';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { ProgramApplicationService } from '../../core/services/program-application.service';
import { TransmogrifierProgramApplication } from '../../core/models/transmogrifier-program-application.class';
import { iPerson } from 'src/app/core/models/person.class';

@Component({
  selector: 'app-program-application',
  templateUrl: './program-application.component.html',
  styleUrls: ['./program-application.component.css']
})
export class ProgramApplicationComponent implements OnInit, OnDestroy {

  contract: iContract;
  trans: TransmogrifierProgramApplication;
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  discriminators: string[] = ['contact_information', 'administrative_information', 'commercial_general_liability_insurance', 'program', 'review_application', 'authorization'];
  persons: iPerson[];
  constructor(
    private stepperService: IconStepperService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private programApplicationService: ProgramApplicationService,
  ) { }

  ngOnInit() {
    this.programApplicationService.getScheduleF('9e9b5111-51c9-e911-b80f-00505683fbf4').subscribe(f => {
      // make the transmogrifier for this form
      this.trans = new TransmogrifierProgramApplication(f);
      // make a list of persons to compensate for incomplete data from Dynamics
      this.persons = this.stateService.main.getValue().persons;
      // add the data that we do have to the collection may be stale but better than nothing.
      // TODO: update when dynamics API is fixed.
      this.trans.programApplications.forEach(t => {
        // for each person
        this.persons.forEach(p => {
          // the ones in the tranmogrifier will be missing information because it is absent from dynamics
          if (p.personId === t.programContact.personId) {
            t.programContact = p;
          }
        });
      });
    });
    this.route.params.subscribe(p => {
      // collect the contract from the route
      const contractId = p['contractId'];
      // don't subscribe because this is only used at page load to collect meta
      const contracts: iContract[] = this.stateService.main.getValue().contracts;
      // isolate the correct contract
      for (let contract of contracts) {
        if (contract.contractId == contractId) {
          this.contract = contract;
        }
      }
      // clear all of the old stepper elements
      this.stepperService.reset();
      this.constructDefaultstepperElements();
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
  constructDefaultstepperElements() {

    // write the default beginning
    [
      {
        itemName: 'Applicant Contact Information',
        formState: 'untouched',
        object: new ContactInformation(),
        discriminator: 'contact_information',
      },
      {
        itemName: 'Applicant Administrative Information',
        formState: 'untouched',
        object: new AdministrativeInformation(),
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
    this.contract.programs.forEach((p: iProgram) => {
      this.stepperService.addStepperElement(new ProgramApplication(), p.programName, 'untouched', 'program');
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
}

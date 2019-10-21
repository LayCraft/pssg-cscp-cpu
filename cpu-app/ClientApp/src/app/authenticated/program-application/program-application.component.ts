import { Component, OnInit } from '@angular/core';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { iProgramApplication, iAnnualProgramApplication, ProgramApplication } from '../../core/models/program-application.class';
import { ContactInformation } from '../../core/models/contact-information.class';
import { AdministrativeInformation } from '../../core/models/administrative-information.class';
import { ProgramApplicationService } from '../../core/services/program-application.service';

@Component({
  selector: 'app-program-application',
  templateUrl: './program-application.component.html',
  styleUrls: ['./program-application.component.css']
})
export class ProgramApplicationComponent implements OnInit {

  contractId: string = 'bar';
  organizationId: string = 'foo';

  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  discriminators: string[] = ['contact_information', 'administrative_information', 'commercial_general_liability_insurance', 'program', 'review_application', 'authorization']
  constructor(
    private programApplicationService: ProgramApplicationService,
    private stepperService: IconStepperService,
  ) { }

  ngOnInit() {

    // keep this component in sync with the stepper service
    this.stepperService.reset();
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
    // set the default top and bottom of the list
    this.constructDefaultstepperElements();
  }

  programApplicationUpdated(programApplication: iProgramApplication): void {
    // handle the updates to the program budget. Write it out to a service or whatever
    console.log("The program application:", programApplication);
  }

  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      // names match? must be the same. Makes the assumption that all names are unique.
      return true;
    }
    return false;
  }
  constructDefaultstepperElements() {
    this.programApplicationService.getProgramApplication('foo', 'bar').subscribe((pa: iAnnualProgramApplication) => {
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
      pa.programs.forEach((p: iProgramApplication) => {
        this.stepperService.addStepperElement(new ProgramApplication(p), p.name, p.formState, 'program')
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
    });
  }
}

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Person, iPerson } from '../../core/models/person.class';
import { PersonService } from '../../core/services/person.service';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { StateService } from '../../core/services/state.service';
import { nameAssemble } from '../../core/constants/name-assemble';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  // this is an organization level component
  reload = false;
  organizationId: string;
  // used for the stepper component
  currentStepperElement: iStepperElement;
  stepperElements: iStepperElement[];

  constructor(
    private router: Router,
    private personService: PersonService,
    private notificationQueueService: NotificationQueueService,
    private stepperService: IconStepperService,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    // stay up to date with the stepper but reset old elements if they exist
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
    // set the default top and bottom list
    this.constructDefaultstepperElements();
  }
  ngOnDestroy() {
    this.stepperService.reset();
  }
  constructDefaultstepperElements(): void {
    // clear the stepper of existing elements
    this.stepperService.reset();
    // this is just a constructor
    this.stateService.main.subscribe(s => {
      //save the organization ID for posting back
      this.organizationId = s.organizationMeta.organizationId;
      s.persons.forEach(person => {
        this.stepperService.addStepperElement(new Person(person), nameAssemble(person.firstName, person.middleName, person.lastName), null, 'person');
      });
    });
  }

  // updateCurrent() {
  // 	// make a current item
  // 	this.currentStepperElement.itemName = this.nameAssemble(this.currentStepperElement.object['firstName'], this.currentStepperElement.object['middleName'], this.currentStepperElement.object['lastName']);
  // }
  save(exit?: boolean) {
    // make a person array to submit
    const cleanup = this.stepperElements.map(s => s.object as iPerson);
    this.personService.setPersons(this.organizationId, cleanup).subscribe(
      () => {
        // Go get the new people with whatever transformations happened.
        this.constructDefaultstepperElements();
        this.notificationQueueService.addNotification('Personnel Saved', 'success');
      },
      err => this.notificationQueueService.addNotification(err, 'danger')
    );
    if (exit) {
      // they chose to exit
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
  add() {
    const element: iPerson = {
      typeOfEmployee: '',
      address: null,
      annualSalary: null,
      baseHourlyWage: null,
      benefits: null,
      email: '',
      fax: '',
      firstName: '',
      hoursWorkedPerWeek: null,
      lastName: '',
      middleName: '',
      personId: '',
      phone: '',
      title: '',
      fundedFromVscp: null,
    };
    this.stepperService.addStepperElement(element, 'New Person', null, 'person');
  }
  remove(id: string = this.currentStepperElement.id) {
    // remove the element
    this.stepperService.removeStepperElement(id);
  }
  onChange(element: iStepperElement) {
    element.itemName = nameAssemble(element.object['firstName'], element.object['middleName'], element.object['lastName'])
    // loop back to shove the new form into the service
    this.stepperService.setStepperElement(element);
  }
}

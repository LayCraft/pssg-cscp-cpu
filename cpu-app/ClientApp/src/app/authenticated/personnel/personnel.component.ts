import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Person, iPerson } from '../../core/models/person.class';
import { PersonService } from '../../core/services/person.service';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { StateService } from '../../core/services/state.service';
import { nameAssemble } from '../../core/constants/name-assemble';
import { DynamicsPostUsers, iDynamicsPostUsers, convertPersonToCrmContact } from '../../core/models/dynamics-post';
import { Transmogrifier } from '../../core/models/transmogrifier.class';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  // this is an organization level component
  reload = false;
  bceid: string;
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
    // when main changes refresh the data
    this.stateService.main.subscribe(m => {
      // set the default top and bottom list
      this.constructStepperElements(m);
    });
    this.bceid = this.stateService.bceid.getValue();
  }
  ngOnDestroy() {
    this.stepperService.reset();
  }
  constructStepperElements(main?: Transmogrifier): void {
    if (!main) { main = this.stateService.main.getValue(); }
    // clear the stepper of existing elements
    this.stepperService.reset();

    main.persons.forEach(person => {
      this.stepperService.addStepperElement(new Person(person), nameAssemble(person.firstName, person.middleName, person.lastName), null, 'person');
    });
  }

  save() {
    // make a person array to submit
    const cleanup: Person[] = this.stepperElements.map(s => s.object as iPerson);
    const post = DynamicsPostUsers(this.stateService.bceid.getValue(), cleanup);
    this.personService.setPersons(post).subscribe(
      () => {
        this.notificationQueueService.addNotification('Personnel Saved', 'success');
        // refresh the list of people on save
        this.stateService.refresh();
      },
      err => this.notificationQueueService.addNotification(err, 'danger')
    );
  }
  exit() {
    if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
  add() {
    const element: iPerson = {
      address: null,
      email: '',
      fax: '',
      firstName: '',
      lastName: '',
      middleName: '',
      personId: '',
      phone: '',
      title: '',
      deactivated: false,
      me: false,
    };
    this.stepperService.addStepperElement(element, 'New Person', null, 'person');
  }
  remove(stepperElement: iStepperElement) {
    // collect the person as an object for deletion
    const person: iPerson = stepperElement.object as iPerson;
    if (!person.me && confirm(`Are you sure that you want to deactivate ${person.firstName} ${person.lastName}? This user will no longer be available in the system.`)) {
      // set deactivated state
      person.deactivated = true;
      const post: iDynamicsPostUsers = {
        BCeID: this.stateService.bceid.getValue(),
        StaffCollection: [convertPersonToCrmContact(person)]
      };
      // post the person
      this.personService.setPersons(post).subscribe(p => {
        // refresh the results
        this.stateService.refresh();
      });
    } else {
      // person is me
      alert('You cannot delete your account.')
    }
  }
  onChange(element: iStepperElement) {
    element.itemName = nameAssemble(element.object['firstName'], element.object['middleName'], element.object['lastName'])
    // loop back to shove the new form into the service
    this.stepperService.setStepperElement(element);
  }
}

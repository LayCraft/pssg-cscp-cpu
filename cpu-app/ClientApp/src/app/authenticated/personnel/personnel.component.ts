import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Person } from '../../core/models/person.class';
import { PersonService } from '../../core/services/person.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier, convertPersonToCrmContact, DynamicsPostUsers } from '../../core/models/transmogrifier.class';
import { iDynamicsPostUsers } from '../../core/models/dynamics-post';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { nameAssemble } from '../../core/constants/name-assemble';
import { iPerson } from '../../core/models/person.interface';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit, OnDestroy {
  // this is an organization level component
  reload = false;
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
    this.stateService.main.subscribe((m: Transmogrifier) => {
      if (m) {
        // set the default top and bottom list
        this.constructStepperElements(m);
      }
    });
  }
  ngOnDestroy() {
    this.stepperService.reset();
  }
  constructStepperElements(main?: Transmogrifier): void {
    if (!main) { main = this.stateService.main.getValue(); }
    // clear the stepper of existing elements
    this.stepperService.reset();
    if (main.persons) {
      main.persons.forEach(person => {
        this.stepperService.addStepperElement(new Person(person), nameAssemble(person.firstName, person.middleName, person.lastName), null, 'person');
      });
      // set the stepper to the first element
      this.stepperService.setToFirstStepperElement();
    }
  }

  save(person: iPerson) {
    // a person needs minimum a first and last name to be submitted
    if (person.firstName && person.lastName) {
      const userId = this.stateService.main.getValue().organizationMeta.userId;
      const organizationId = this.stateService.main.getValue().organizationMeta.organizationId;
      const post = DynamicsPostUsers(userId, organizationId, [person]);
      // console.log(post);
      this.personService.setPersons(post).subscribe(
        () => {
          this.notificationQueueService.addNotification('Personnel Saved', 'success');
          // refresh the list of people on save
          this.stateService.refresh();
        },
        err => this.notificationQueueService.addNotification(err, 'danger')
      );
    } else {
      // notify the user that this user was not saved.
      this.notificationQueueService.addNotification('A person must have a first and last name.', 'warning');
    }
  }

  exit() {
    if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
      this.router.navigate(['/authenticated/dashboard']);
    }
  }

  add() {
    const element: iPerson = {
      address: null,
      deactivated: false,
      email: '',
      fax: '',
      firstName: '',
      lastName: '',
      me: false,
      middleName: '',
      personId: '',
      phone: '',
      title: '',
      userId: null,
    };
    this.stepperService.addStepperElement(element, 'New Person', null, 'person');
  }
  remove(stepperElement: iStepperElement) {
    // collect the person as an object for deletion
    const person: iPerson = stepperElement.object as iPerson;

    // if the person didn't exist we simple remove them. We do not post back to the server
    if (!person.personId) {
      this.stateService.refresh();
    } else if (!person.me && confirm(`Are you sure that you want to deactivate ${person.firstName} ${person.lastName}? This user will no longer be available in the system.`)) {
      // set deactivated state
      person.deactivated = true;
      const userId = this.stateService.main.getValue().organizationMeta.userId;
      const organizationId = this.stateService.main.getValue().organizationMeta.organizationId;
      const post: iDynamicsPostUsers = {
        UserBCeID: userId,
        BusinessBCeID: organizationId,
        StaffCollection: [convertPersonToCrmContact(person)]
      };
      // post the person
      this.personService.setPersons(post).subscribe(p => {
        // refresh the results
        this.stateService.refresh();
      });
    }
  }
  onChange(element: iStepperElement) {
    element.itemName = nameAssemble(element.object['firstName'], element.object['middleName'], element.object['lastName']);
    // loop back to shove the new form into the service
    this.stepperService.setStepperElement(element);
  }
}

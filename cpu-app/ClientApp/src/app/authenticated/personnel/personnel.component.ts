import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Person } from '../../core/models/person.class';
import { PersonService } from '../../core/services/person.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { convertPersonToDynamics } from '../../core/models/converters/person-to-dynamics';
import { iDynamicsPostUsers } from '../../core/models/dynamics-post';
import { iPerson } from '../../core/models/person.interface';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { nameAssemble } from '../../core/constants/name-assemble';
import { convertPersonnelToDynamics } from '../../core/models/converters/personnel-to-dynamics';
import { FormHelper } from '../../core/form-helper';
import { FormGroup } from '@angular/forms';

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
  stepperIndex: number = 0;
  stepperElements: iStepperElement[];
  trans: Transmogrifier;
  saving: boolean = false;
  public nameAssemble = nameAssemble;
  public formHelper = new FormHelper();
  personForm: FormGroup;
  didLoad: boolean = false;
  constructor(
    private router: Router,
    private personService: PersonService,
    private notificationQueueService: NotificationQueueService,
    private stepperService: IconStepperService,
    private stateService: StateService,
    // private formHelper: FormHelper
  ) { }

  ngOnInit() {
    // stay up to date with the stepper but reset old elements if they exist
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
    // when main changes refresh the data
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;
      // set the default top and bottom list
      this.constructStepperElements(m);
      this.didLoad = true;
    });
  }
  ngOnDestroy() {
    this.stepperService.reset();
  }
  constructStepperElements(m: Transmogrifier): void {
    // clear the stepper of existing elements
    this.stepperService.reset();
    if (m.persons) {
      m.persons.sort(function (a, b) {
        let name1 = nameAssemble(a.firstName, a.middleName, a.lastName);
        let name2 = nameAssemble(b.firstName, b.middleName, b.lastName);
        return name1 > name2 ? 1 : name1 < name2 ? -1 : 0;
      });
      m.persons.forEach(person => {
        this.stepperService.addStepperElement(person, nameAssemble(person.firstName, person.middleName, person.lastName), null, 'person');
      });
      // set the stepper to the first element
      if (!this.didLoad) {
        this.stepperService.setToFirstStepperElement();
      }
      else {
        this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
      }
    }
  }

  save(person: iPerson) {
    if (!this.formHelper.isFormValid(this.notificationQueueService)) {
      return;
    }

    console.log(person);
    this.saving = true;
    // a person needs minimum a first and last name to be submitted
    if (person.firstName && person.lastName) {
      const userId = this.stateService.main.getValue().userId;
      const organizationId = this.stateService.main.getValue().organizationId;
      const post = convertPersonnelToDynamics(userId, organizationId, [person]);
      // console.log(post);
      this.personService.setPersons(post).subscribe(
        () => {
          this.saving = false;
          this.notificationQueueService.addNotification(`Information is saved for ${nameAssemble(person.firstName, person.middleName, person.lastName)}`, 'success');
          // refresh the list of people on save
          this.stepperIndex = this.stepperElements.findIndex(s => s.id === this.currentStepperElement.id) || 0;
          this.stateService.refresh();
        },
        err => {
          this.notificationQueueService.addNotification(err, 'danger');
          this.saving = false;
        }
      );
    } else {
      this.saving = false;
      // notify the user that this user was not saved.
      this.notificationQueueService.addNotification('A person must have a first and last name.', 'warning');
    }
  }

  exit() {
    if (this.formHelper.isFormDirty()) {
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

  add() {
    const element = new Person();
    this.stepperService.addStepperElement(element, 'New Person', null, 'person');
    this.trans.persons.push(element);
  }
  remove(person: iPerson) {
    // if the person didn't exist we simple remove them. We do not post back to the server
    if (!person.personId) {
      this.stateService.refresh();
    } else if (!person.me && confirm(`Are you sure that you want to deactivate ${person.firstName} ${person.lastName}? This user will no longer be available in the system.`)) {
      // set deactivated state
      this.saving = true;
      person.deactivated = true;
      const userId = this.stateService.main.getValue().userId;
      const organizationId = this.stateService.main.getValue().organizationId;
      const post: iDynamicsPostUsers = {
        UserBCeID: userId,
        BusinessBCeID: organizationId,
        StaffCollection: [convertPersonToDynamics(person)]
      };
      // post the person
      this.personService.setPersons(post).subscribe(p => {
        this.saving = false;

        if (this.stepperIndex > 0) --this.stepperIndex;
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

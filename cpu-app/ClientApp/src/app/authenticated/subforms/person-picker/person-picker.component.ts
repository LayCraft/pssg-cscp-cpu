import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { iPerson } from '../../../core/models/person.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';
import { Person } from '../../../core/models/person.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-picker',
  templateUrl: './person-picker.component.html',
  styleUrls: ['./person-picker.component.scss']
})
export class PersonPickerComponent implements OnInit, OnDestroy {
  // this is a person form control that uses template binding.

  @Input() title = 'Select Person';
  @Input() isDisabled: boolean = false;
  @Input() person: iPerson;
  @Input() idNum: number = 0;
  @Output() personChange = new EventEmitter<iPerson>();
  @Input() showCard = true;
  public nameAssemble = nameAssemble;
  trans: Transmogrifier;
  private stateSubscription: Subscription;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  ngOnInit() {
    // make a new person object from what was handed to this picker.
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;

      //if no person provided, initialize as empty person
      if (!this.person) {
        this.person = new Person();
      }
      // load the person into the picker on initialization or just the first person in the list
      this.setPerson(this.person.personId);
    });
  }
  setPerson(personId: string): void {
    // assign the person into the person object
    this.person = this.trans.persons.filter(p => p.personId === this.person.personId)[0];
  }
  onChange() {
    // set the person into the picker before emitting
    this.setPerson(this.person.personId);
    this.personChange.emit(this.person);
  }
}

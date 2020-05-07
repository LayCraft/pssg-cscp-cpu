import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { iPerson } from '../../../core/models/person.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-person-picker-list',
  templateUrl: './person-picker-list.component.html',
  styleUrls: ['./person-picker-list.component.scss']
})
export class PersonPickerListComponent implements OnInit, OnDestroy {
  @Input() label = "Select all people who apply."
  @Input() personsObj: any = {}; // the list from the servicezz
  persons: iPerson[] = [];
  removedPersons: iPerson[] = [];
  // @Input() persons: iPerson[] = []; // the list from the servicezz
  // @Input() removedPersons: iPerson[] = []; // the list from the service
  @Output() personsChange = new EventEmitter<any>();
  public nameAssemble = nameAssemble;
  trans: Transmogrifier;
  selectedPerson: string;
  private stateSubscription: Subscription;

  constructor(private stateService: StateService) { }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  ngOnInit() {
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => this.trans = m);
    this.persons = this.personsObj.persons;
    this.removedPersons = this.personsObj.removedPersons;
  }
  addPerson(personId: string) {
    if (personId === "null") return;
    const personInList: boolean = !!this.persons.filter(p => p.personId === personId).length;
    // only add someone if they are not in there already
    if (!personInList) {
      const person: iPerson = this.trans.persons.filter(p => p.personId === personId)[0];
      // the person is not in the list so we add them
      this.persons.push(person);
      this.removedPersons = this.removedPersons.filter(p => p.personId !== personId);
      this.personsObj.persons = this.persons;
      this.personsObj.removedPersons = this.removedPersons;
      this.personsChange.emit(this.personsObj);
      // this.personsChange.emit(this.removedPersons);
    }
  }
  removePerson(personId: string) {
    let person: iPerson = this.trans.persons.filter(p => p.personId === personId)[0];
    if (!person) {
      person = this.persons.filter(p => p.personId === personId)[0];
    }

    if (person) {
      this.removedPersons.push(person);
    }

    this.persons = this.persons.filter(p => p.personId !== personId);

    this.personsObj.persons = this.persons;
    this.personsObj.removedPersons = this.removedPersons;
    this.personsChange.emit(this.personsObj);

    // this.personsChange.emit(this.removedPersons);
  }
}

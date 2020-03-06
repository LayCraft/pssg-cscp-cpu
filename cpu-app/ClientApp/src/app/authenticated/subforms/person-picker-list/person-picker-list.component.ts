import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson } from '../../../core/models/person.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
@Component({
  selector: 'app-person-picker-list',
  templateUrl: './person-picker-list.component.html',
  styleUrls: ['./person-picker-list.component.scss']
})
export class PersonPickerListComponent implements OnInit {
  @Input() label = "Select all people who apply."
  @Input() persons: iPerson[] = []; // the list from the service
  @Input() removedPersons: iPerson[] = []; // the list from the service
  @Output() personsChange = new EventEmitter<iPerson[]>();
  public nameAssemble = nameAssemble;
  trans: Transmogrifier;
  selectedPerson: string;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.main.subscribe((m: Transmogrifier) => this.trans = m);
  }
  addPerson(personId: string) {
    console.log("addPerson");
    console.log(personId);
    if (personId === "null") return;
    const personInList: boolean = !!this.persons.filter(p => p.personId === personId).length;
    // only add someone if they are not in there already
    if (!personInList) {
      const person: iPerson = this.trans.persons.filter(p => p.personId === personId)[0];
      // the person is not in the list so we add them
      this.persons.push(person);
      this.removedPersons = this.removedPersons.filter(p => p.personId !== personId);
      console.log(this.removedPersons);
      this.personsChange.emit(this.persons);
      // this.personsChange.emit(this.removedPersons);
    }
  }
  removePerson(personId: string) {
    const person: iPerson = this.trans.persons.filter(p => p.personId === personId)[0];
    this.removedPersons.push(person);
    this.persons = this.persons.filter(p => p.personId !== personId);
    this.personsChange.emit(this.persons);
    console.log(this.removedPersons);
    // this.personsChange.emit(this.removedPersons);
    //TODO - save this removed person info. Will need to be included in a collection in the CRM API post data, something like ProgramContactsRemoveCollection
  }
}

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
  @Output() personsChange = new EventEmitter<iPerson[]>();
  public nameAssemble = nameAssemble;
  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.persons = m.persons;
    });
  }
  onInput() {
    // build a list for outputting.
    this.personsChange.emit(this.persons);
  }
  addPerson(id: string) {
    const matchingPersons: boolean = this.personInPersonsList(id);
    // only add someone if they are not in there already
    if (!matchingPersons) {
      // if the item is not in the list we add it
      for (let person of this.persons) {
        if (person.personId === id) {
          this.persons.push(person);
        }
      }
      // emit
      this.onInput();
    }
  }
  personInPersonsList(id: string): boolean {
    return !!this.persons.filter(p => p.personId === id).length;
  }
  removePerson(id: string) {
    this.persons = this.persons.filter(p => !(p.personId === id));
    this.onInput();
  }
}

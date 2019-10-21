import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson } from '../../../core/models/person.class';
import { nameAssemble } from '../../../core/constants/name-assemble';
@Component({
  selector: 'app-person-picker-list',
  templateUrl: './person-picker-list.component.html',
  styleUrls: ['./person-picker-list.component.scss']
})
export class PersonPickerListComponent implements OnInit {
  @Input() label = "Select all people who apply."
  @Input() persons: iPerson[];
  @Output() personsChange = new EventEmitter<iPerson[]>();

  personsList: iPerson[] = [];
  public nameAssemble = nameAssemble;
  constructor() { }

  ngOnInit() { }
  onInput() {
    // build a list for outputting.
    this.personsChange.emit(this.personsList);
  }
  addPerson(id: string) {
    const matchingPersons: boolean = this.personInPersonsList(id);
    // only add someone if they are not in there already
    if (!matchingPersons) {
      // if the item is not in the list we add it
      for (let person of this.persons) {
        if (person.personId === id) {
          this.personsList.push(person);
        }
      }
      // emit
      this.onInput();
    }
  }
  personInPersonsList(id: string): boolean {
    return !!this.personsList.filter(p => p.personId === id).length;
  }
  removePerson(id: string) {
    this.personsList = this.personsList.filter(p => !(p.personId === id));
    this.onInput();
  }
}

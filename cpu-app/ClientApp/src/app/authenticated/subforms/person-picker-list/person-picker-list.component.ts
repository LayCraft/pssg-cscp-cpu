import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson } from '../../../core/models/person.class';

@Component({
  selector: 'app-person-picker-list',
  templateUrl: './person-picker-list.component.html',
  styleUrls: ['./person-picker-list.component.scss']
})
export class PersonPickerListComponent implements OnInit {
  @Input() label = "Select all people who apply."
  @Input() persons: iPerson[];
  @Output() personsChange = new EventEmitter<iPerson[]>();
  constructor() { }

  personList: iPerson[] = [];

  ngOnInit() { }
  onInput() {
    // build a list for outputting.
    this.personsChange.emit(this.personList);
  }
  addPerson(id: string) {
    // if there is a matching person the length is positive and truthy. ! makes it false then ! again makes it true.
    // if there is no matching person the lenght is 0 and falsy. ! makes it true then ! again makes it false.
    const matchingPersons: boolean = !!this.personList.filter(p => p.personId === id).length;

    // only add someone if they are not in there already
    if (!matchingPersons) {
      // if the item is not in the list we add it
      for (let person of this.persons) {
        if (person.personId === id) {
          this.personList.push(person);
        }
      }
      // emit
      this.onInput();
    }
  }
  removePerson(id: string) {
    this.personList = this.personList.filter(p => !(p.personId === id));
    this.onInput();
  }
}

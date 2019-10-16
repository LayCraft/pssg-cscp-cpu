import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson } from '../../../core/models/person.class';

@Component({
  selector: 'app-person-picker',
  templateUrl: './person-picker.component.html',
  styleUrls: ['./person-picker.component.scss']
})
export class PersonPickerComponent implements OnInit {
  // this is a person form control that uses template binding.

  @Input() title = 'Select Person';
  @Input() persons: iPerson[] = [];
  @Output() person = new EventEmitter<iPerson>();
  @Input() showCard = true;
  personId: string; // assumed that all persons have unique ids
  currentPerson: iPerson;

  constructor() { }
  ngOnInit() { }

  onChange() {
    this.currentPerson = this.persons.filter(p => p.personId === this.personId)[0];
    // emit the first person that the selected ID matches
    this.person.emit(this.persons.filter(p => p.personId === this.personId)[0])
  }
}

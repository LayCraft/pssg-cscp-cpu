import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../../classes/person.class';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  @Input() person: Person;
  @Output() personChange = new EventEmitter<Person>();
  @Output() write = new EventEmitter<Person>();
  editMode = false;
  constructor() { }

  ngOnInit() {
    // if they don't have a name they must be new. Show the edit form
    if (!this.person.firstName || !this.person.lastName) {
      this.editMode = true;
    }
  }

  save() {
    // emit the person to the parent for submission to the service
    this.write.emit(this.person);
    // switch off of edit mode
    this.editMode = !this.editMode;
  }
}

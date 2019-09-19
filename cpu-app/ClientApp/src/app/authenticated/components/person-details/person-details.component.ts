import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/core/models/person.class';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  @Input() person: Person;
  @Output() personChange = new EventEmitter<Person>();
  constructor() { }

  ngOnInit() {
  }

}

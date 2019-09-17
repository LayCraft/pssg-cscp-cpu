import { Component, OnInit } from '@angular/core';
import { Person } from '../../classes/person.class';

@Component({
  selector: 'app-personnel-page',
  templateUrl: './personnel-page.component.html',
  styleUrls: ['./personnel-page.component.scss']
})
export class PersonnelPageComponent implements OnInit {

  constructor() { }

  personList: Person[] = [];
  ngOnInit() { }
  addPerson() {
    this.personList.push(new Person());
  }
  save(close = false) {
    alert('Saved.');
  }
}

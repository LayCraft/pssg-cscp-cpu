import { Component, OnInit } from '@angular/core';
import { Person } from '../../classes/person.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnel-page',
  templateUrl: './personnel-page.component.html',
  styleUrls: ['./personnel-page.component.scss']
})
export class PersonnelPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  personList: Person[] = [];
  ngOnInit() { }
  addPerson() {
    this.personList.push(new Person());
  }
  save(close = false) {
    close ? this.router.navigate(['dashboard']) : alert('Saved!');
  }
}

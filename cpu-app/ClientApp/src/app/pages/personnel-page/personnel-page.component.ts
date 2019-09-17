import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../../classes/person.class';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-personnel-page',
  templateUrl: './personnel-page.component.html',
  styleUrls: ['./personnel-page.component.scss']
})
export class PersonnelPageComponent implements OnInit {

  constructor(
    private router: Router,
    private personService: PersonService,
  ) { }

  personList: Person[] = [];
  ngOnInit() {
    // subscribe to the organization's person list
    this.personService.getPersons('ORGID').subscribe((persons: Person[]) => {
      this.personList = persons;
      console.log(persons);
    });
  }
  addPerson() {
    this.personList.push(new Person());
  }
  close() { this.router.navigate(['dashboard']); }
  writePerson(person: Person) {
    this.personService.setPerson('ORGID', person).subscribe(() => { });
  }
}

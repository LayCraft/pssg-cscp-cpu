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
  currentPerson: Person;

  ngOnInit() {
    // subscribe to the organization's person list
    this.personService.getPersons('ORGID').subscribe((persons: Person[]) => {
      //if there are
      if (persons.length > 0) {
        // Add persons to person list
        persons.forEach(p => this.personList.push(new Person(p)));
        this.currentPerson = this.personList[0];
      } else {
        // add a dummy person
        this.addPerson();
      }
    });
  }

  addPerson() {
    // must have at least added a firstname to the person
    if (this.personList[this.personList.length - 1].firstName) {
      const fakePerson = new Person();
      this.personList.push(fakePerson);
      this.navigateToPerson(this.personList[this.personList.length - 1]);
    } else {
      alert('Already added.');
    }
  }
  savePerson() {
    // set the person in the service
    this.personService.setPerson('ORGID', this.currentPerson).subscribe(p => { });
  }
  close() {
    if (confirm("Saving the changes to current person. Click cancel to go back to the dashboard without saving.")) {
      this.savePerson();
    }
    this.router.navigate(['dashboard']);
  }

  navigateToPerson(person: Person) {
    // if (person != this.currentPerson && confirm("Saving the changes. Click cancel to switch without saving.")) {
    if (person != this.currentPerson) {

      this.savePerson();
      this.currentPerson = person;
    }
  }
}

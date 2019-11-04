import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { iPerson, Person } from '../models/person.class';
import { iAddress } from '../models/address.class';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  fakePeople: iPerson[] = [
    {
      firstName: 'Blaine',
      middleName: 'Alan',
      lastName: 'Megaman',
      typeOfEmployee: 'regular',
      title: 'Photographer',
      email: 'foobar@baz.qux',
      personId: 'alkfhaklafd',
      phone: '1(250)891-5376 ext 3',
      address: {
        line1: 'foo',
        city: 'bar',
        country: 'Canada',
        postalCode: 'V8V 3E9',
        province: 'Alberta',
      } as iAddress
    },
    {
      firstName: 'Curtis',
      middleName: 'Hathor',
      lastName: 'Masters',
      typeOfEmployee: 'regular',
      title: 'Grunt Worker',
      email: 'foobar@baz.qux',
      personId: 'qweroprewqio',
    }
  ];

  getfakePersonFromMockList(personId: string): iPerson {
    // remove everyone from the array besides the person we care about then return the person
    return this.fakePeople.filter(p => p.personId)[0] || null;
  }
  insertfakePersonFromMockList(person: Person): iPerson {
    // if there is nobody in hte list with matching ID add them
    if (this.fakePeople.filter(p => person.personId === p.personId).length === 0) {
      this.fakePeople.push(person);
    }
    return person;
  }

  constructor() { }
  getPersons(organizationId: string): Observable<iPerson[]> {
    return of(this.fakePeople);
  }
  setPersons(organizationId: string, persons: iPerson[]): Observable<iPerson[]> {
    this.fakePeople = persons;
    return of(this.fakePeople);
  }

  setPerson(organizationId: string, person: Person): Observable<iPerson> {
    return of(this.insertfakePersonFromMockList(person));
  }
  getPerson(organizationId: string, personId: string): Observable<iPerson> {
    return of(this.getfakePersonFromMockList(personId));
  }
}

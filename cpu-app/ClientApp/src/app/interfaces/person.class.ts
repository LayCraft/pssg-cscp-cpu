import { iPerson } from "./person.interface";
import { Address } from "./address.class";

export class Person implements iPerson {
  typeOfEmployee: string; // frontline, regular,
  firstName: string;
  middleName?: string;
  lastName: string;
  title: string;
  email: string;
  phone?: string;
  fax?: string;
  address?: Address;
  baseHourlyWage?: number;
  hoursWorkedPerWeek?: number;
  annualSalary?: number;
  benefits?: number;
  fundedFromVCSP: number;
  constructor(person: iPerson) {
    this.typeOfEmployee = person.typeOfEmployee
    this.firstName = person.firstName
    this.middleName = person.middleName
    this.lastName = person.lastName
    this.title = person.title
    this.email = person.email
    this.phone = person.phone
    this.fax = person.fax
    this.address = new Address(person.address)
    this.baseHourlyWage = person.baseHourlyWage
    this.hoursWorkedPerWeek = person.hoursWorkedPerWeek
    this.annualSalary = person.annualSalary
    this.benefits = person.benefits
    this.fundedFromVCSP = person.fundedFromVCSP
  }
  toDynamics(): object {
    return {}
  }
  fromDynamics(dynamicsObject) {
  }
}

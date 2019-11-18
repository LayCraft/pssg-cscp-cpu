import { Address, iAddress } from "./address.class";
export interface iPerson {
  address?: iAddress;
  email: string;
  fax?: string;
  firstName: string;
  activeUser: boolean;
  deactivated?: boolean; // if true this deactivates
  lastName: string;
  middleName?: string;
  personId: string;
  phone?: string;
  title: string;
  typeOfEmployee?: string; // frontline, regular,
}

export class Person implements iPerson {
  address?: iAddress;
  annualSalary?: number;
  baseHourlyWage?: number;
  benefits?: number;
  email: string;
  fax?: string;
  firstName: string;
  // fundedFromVscp?: number;
  hoursWorkedPerWeek?: number;
  deactivated?: boolean;
  lastName: string;
  middleName?: string;
  personId: string;
  phone?: string;
  activeUser: boolean;
  title: string;
  typeOfEmployee?: string; // frontline, regular,
  constructor(person?: iPerson) {
    if (person) {
      this.address = new Address(person.address) || new Address();
      this.deactivated = person.deactivated || null;
      this.email = person.email || null;
      this.fax = person.fax || null;
      this.firstName = person.firstName || null;
      this.lastName = person.lastName || null;
      this.middleName = person.middleName || null;
      this.personId = person.personId || null;
      this.phone = person.phone || null;
      this.title = person.title || null;
    } else {
      this.address = new Address();
    }
  }
}

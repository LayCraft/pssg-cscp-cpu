import { Address } from "./address.class";
import { iAddress } from "./address.interface";
export interface iPerson {
  personId: string;
  userId?: string;
  address?: iAddress;
  deactivated?: boolean; // if true this deactivates
  email: string;
  fax?: string;
  firstName: string;
  lastName: string;
  me?: boolean; // is this the current user? If so this is "me".
  middleName?: string;
  phone?: string;
  title?: string;
}

export class Person implements iPerson {
  address?: iAddress;
  annualSalary?: number;
  baseHourlyWage?: number;
  benefits?: number;
  deactivated?: boolean;
  email: string;
  fax?: string;
  firstName: string;
  hoursWorkedPerWeek?: number;
  lastName: string;
  me?: boolean = false;
  middleName?: string;
  personId: string;
  phone?: string;
  title?: string;
  userId?: string;
  constructor(person?: iPerson) {
    if (person) {
      this.address = new Address(person.address) || new Address();
      this.deactivated = person.deactivated || false;
      this.email = person.email || null;
      this.fax = person.fax || null;
      this.firstName = person.firstName || null;
      this.lastName = person.lastName || null;
      this.middleName = person.middleName || null;
      this.personId = person.personId || null;
      this.phone = person.phone || null;
      this.title = person.title || null;
      this.userId = person.userId || null;
      this.me = person.me;
    } else {
      this.address = new Address();
    }
  }
}

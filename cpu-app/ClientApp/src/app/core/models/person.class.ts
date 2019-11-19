import { Address, iAddress } from "./address.class";
export interface iPerson {
  address?: iAddress;
  deactivated?: boolean; // if true this deactivates
  email: string;
  fax?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  personId: string;
  phone?: string;
  title?: string;
  me: boolean; // is this the current user? If so this is "me".
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
  middleName?: string;
  personId: string;
  phone?: string;
  title?: string;
  me: boolean = false;
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
      this.me = person.me;
    } else {
      this.address = new Address();
    }
  }
}

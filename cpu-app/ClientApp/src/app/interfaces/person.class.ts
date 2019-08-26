import { iPerson } from "./person.interface";
import { Address } from "./program-information.class";

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
}

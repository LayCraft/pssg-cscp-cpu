import { iAddress } from "./address.interface";

export interface iPerson {
  typeOfEmployee: string; // frontline, regular,
  firstName: string;
  middleName?: string;
  lastName: string;
  title: string;
  email: string;
  phone?: string;
  fax?: string;
  address?: iAddress;
  baseHourlyWage?: number;
  hoursWorkedPerWeek?: number;
  annualSalary?: number;
  benefits?: number;
  fundedFromVCSP: number;
}

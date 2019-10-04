import { Address, iAddress } from "./address.class";
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
	fundedFromVscp?: number;
	personId: string;
}

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
	fundedFromVscp?: number;
	personId: string;
	constructor(person?: iPerson) {
		if (person) {
			this.typeOfEmployee = person.typeOfEmployee || null; // frontline, regular,
			this.firstName = person.firstName || null;
			this.middleName = person.middleName || null;
			this.lastName = person.lastName || null;
			this.title = person.title || null;
			this.email = person.email || null;
			this.phone = person.phone || null;
			this.fax = person.fax || null;
			this.address = new Address(person.address) || new Address();
			this.baseHourlyWage = person.baseHourlyWage || null;
			this.hoursWorkedPerWeek = person.hoursWorkedPerWeek || null;
			this.annualSalary = person.annualSalary || null;
			this.benefits = person.benefits || null;
			this.fundedFromVscp = person.fundedFromVscp || null;
			this.personId = person.personId || null;
		} else {
			this.address = new Address();
		}
	}
}

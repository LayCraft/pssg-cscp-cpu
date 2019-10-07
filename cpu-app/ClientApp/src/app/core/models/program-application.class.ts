import { Address, iAddress } from "./address.class";
import { Person, iPerson } from "./person.class";
import { iContactInformation } from './contact-information.class';

export interface iAnnualProgramApplication {
	organizationId: string;
	contractId: string;
	programContact: iContactInformation;
	programs: iProgramApplication[];
	formState: string; // untouched	incomplete	invalid	complete info
}

export interface iProgramApplication {
	name: string;
	formState: string;
	contractId: string;
	programId: string;

	email: string;
	programLocation: string;
	serviceArea: string;
	phoneNumber: string;
	faxNumber: string;
	revenueSources: iRevenueSource[];

	mainAddress: iAddress; // should be a class
	mailingAddress: iAddress; // should be a class (for building forms from )
	programContact: iPerson;
	additionalStaff: iPerson[];

	operationHours: iHours[];
	standbyHours: iHours[];
}

export class ProgramApplication implements iProgramApplication {

	contractId: string;
	programId: string;
	name: string;
	formState: string;
	email: string;
	programLocation: string;
	serviceArea: string;
	phoneNumber: string;
	faxNumber: string;
	revenueSources: iRevenueSource[];

	mainAddress: iAddress; // should be a class
	mailingAddress: iAddress; // should be a class (for building forms from )
	programContact: iPerson;
	additionalStaff: iPerson[];

	operationHours: iHours[];
	standbyHours: iHours[];

	constructor(prog?: iProgramApplication) {
		if (prog) {
			this.name = prog.name || null;
			this.formState = prog.formState || null;
			this.programId = prog.programId || null;
			this.contractId = prog.contractId || null;
			this.programLocation = prog.programLocation || null;
			this.serviceArea = prog.serviceArea || null;
			this.phoneNumber = prog.phoneNumber || null;
			this.faxNumber = prog.faxNumber || null;
			this.mainAddress = new Address(prog.mainAddress) || new Address();
			this.mailingAddress = new Address(prog.mailingAddress) || new Address();
			this.programContact = new Person(prog.programContact) || new Person();
			// populate arrays if they are included
			prog.additionalStaff ? prog.additionalStaff.forEach(s => this.additionalStaff.push(new Person(s))) : this.additionalStaff = [];
			prog.revenueSources ? prog.revenueSources.forEach(r => this.revenueSources.push(new RevenueSource(r))) : this.revenueSources = [];
			prog.operationHours ? prog.operationHours.forEach(o => this.operationHours.push(new Hours(o))) : this.operationHours = [];
			prog.standbyHours ? prog.standbyHours.forEach(s => this.standbyHours.push(new Hours(s))) : this.standbyHours = [];
			prog.additionalStaff ? prog.additionalStaff.forEach(p => this.additionalStaff.push(new Person(p))) : this.additionalStaff = [];
		} else {
			this.mainAddress = new Address();
			this.mailingAddress = new Address();
			this.programContact = new Person();
		}
	}
}

export interface iHours {
	monday: boolean;
	tuesday: boolean;
	wednesday: boolean;
	thursday: boolean;
	friday: boolean;
	saturday: boolean;
	sunday: boolean;
	open: Date; // just used for the hour representation
	closed: Date;
}
export class Hours implements iHours {
	monday: boolean;
	tuesday: boolean;
	wednesday: boolean;
	thursday: boolean;
	friday: boolean;
	saturday: boolean;
	sunday: boolean;
	open: Date; // just used for the hour representation
	closed: Date;
	constructor(hours?: iHours) {
		if (hours) {
			this.monday = hours.monday || null;
			this.tuesday = hours.tuesday || null;
			this.wednesday = hours.wednesday || null;
			this.thursday = hours.thursday || null;
			this.friday = hours.friday || null;
			this.saturday = hours.saturday || null;
			this.sunday = hours.sunday || null;
			this.open = new Date(hours.open) || null;
			this.closed = new Date(hours.closed) || null;
		}
	}
}
export interface iRevenueSource {
	revenueSourceName: string;
	cash: number;
	inKindContribution: number;
	other: string;
}

export class RevenueSource implements iRevenueSource {
	revenueSourceName: string;
	cash: number;
	inKindContribution: number;
	other: string;
	constructor(rs?: iRevenueSource) {
		if (rs) {
			this.revenueSourceName = rs.revenueSourceName || null;
			this.cash = rs.cash || null;
			this.inKindContribution = rs.inKindContribution || null;
			this.other = rs.other || null;
		}
	}
}


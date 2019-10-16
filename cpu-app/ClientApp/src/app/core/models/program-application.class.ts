import { Address, iAddress } from "./address.class";
import { Person, iPerson } from "./person.class";
import { iContactInformation, ContactInformation } from './contact-information.class';
import { iRevenueSource, RevenueSource } from './revenue-source.class';
import { iHours, Hours } from './hours.class';

export interface iAnnualProgramApplication {
	organizationId: string;
	contractId: string;
	programContact: iContactInformation;
	programs: iProgramApplication[];
	formState: string; // untouched	incomplete	invalid	complete info
}

export class AnnualProgramApplication {
	organizationId: string;
	contractId: string;
	programContact: iContactInformation;
	programs: iProgramApplication[] = [];
	formState: string; // untouched	incomplete	invalid	complete info
	constructor(apa?: iAnnualProgramApplication) {
		if (apa) {
			this.organizationId = apa.organizationId || null;
			this.contractId = apa.contractId || null;
			this.formState = apa.formState || null;
			this.programContact = new ContactInformation(apa.programContact) || null;
			apa.programs ? apa.programs.forEach(p => this.programs.push(new ProgramApplication(p))) : this.programs = [];
		} else {
			this.programContact = new ContactInformation();
		}
	}
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

	mainAddress: iAddress; // should be a class
	mailingAddress: iAddress; // should be a class (for building forms from )
	programContact: iPerson;

	revenueSources: iRevenueSource[] = [];
	additionalStaff: iPerson[] = [];
	operationHours: iHours[] = [];
	standbyHours: iHours[] = [];

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

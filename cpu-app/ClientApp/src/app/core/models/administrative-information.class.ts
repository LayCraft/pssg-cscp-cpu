import { iPerson, Person } from './person.class';

export interface iAdministrativeInformation {
	compliantEmploymentStandardsAct: boolean;
	compliantHumanRights: boolean;
	compliantWorkersCompensation: boolean;
	staffUnionized: boolean;
	staffUnion: string;
	ccseaMemberType: string;
	staffSubcontracted: boolean;
	staffSubcontractedPersons: iPerson[];
}

export class AdministrativeInformation implements iAdministrativeInformation {
	compliantEmploymentStandardsAct: boolean;
	compliantHumanRights: boolean;
	compliantWorkersCompensation: boolean;
	staffUnionized: boolean;
	staffUnion: string;
	ccseaMemberType: string;
	staffSubcontracted: boolean;
	staffSubcontractedPersons: iPerson[] = [];
	constructor(ai?: iAdministrativeInformation) {
		if (ai) {
			this.compliantEmploymentStandardsAct = ai.compliantEmploymentStandardsAct || null;
			this.compliantHumanRights = ai.compliantHumanRights || null;
			this.compliantWorkersCompensation = ai.compliantWorkersCompensation || null;
			this.staffUnionized = ai.staffUnionized || null;
			this.staffUnion = ai.staffUnion || null;
			this.ccseaMemberType = ai.ccseaMemberType || null;
			this.staffSubcontracted = ai.staffSubcontracted || null;
			// if it exists loop over item and make a new object otherwise set the property to a blank array
			ai.staffSubcontractedPersons ? ai.staffSubcontractedPersons.forEach(x => this.staffSubcontractedPersons.push(new Person(x))) : this.staffSubcontractedPersons = [];
		}
	}
}

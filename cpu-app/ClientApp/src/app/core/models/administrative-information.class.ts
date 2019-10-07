export interface iAdministrativeInformation {
	compliantEmploymentStandardsAct: boolean;
	compliantHumanRights: boolean;
	compliantWorkersCompensation: boolean;
	staffUnionized: boolean;
	staffUnion: string;
	ccseaMemberType: string;
	staffSubcontracted: boolean;
}

export class AdministrativeInformation implements iAdministrativeInformation {
	compliantEmploymentStandardsAct: boolean;
	compliantHumanRights: boolean;
	compliantWorkersCompensation: boolean;
	staffUnionized: boolean;
	staffUnion: string;
	ccseaMemberType: string;
	staffSubcontracted: boolean;
	constructor(ai?: iAdministrativeInformation) {
		if (ai) {
			this.compliantEmploymentStandardsAct = ai.compliantEmploymentStandardsAct || null;
			this.compliantHumanRights = ai.compliantHumanRights || null;
			this.compliantWorkersCompensation = ai.compliantWorkersCompensation || null;
			this.staffUnionized = ai.staffUnionized || null;
			this.staffUnion = ai.staffUnion || null;
			this.ccseaMemberType = ai.ccseaMemberType || null;
			this.staffSubcontracted = ai.staffSubcontracted || null;
		}
	}
}

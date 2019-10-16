import { iContactInformation, ContactInformation } from './contact-information.class';

export interface iOrganizationMeta {
	organizationId: string;
	organizationName: string;
	contracts: string[];
	contactInformation: iContactInformation;
}
export class OrganizationMeta {
	organizationId: string;
	organizationName: string;
	contracts: string[];
	contactInformation: iContactInformation = new ContactInformation();
}
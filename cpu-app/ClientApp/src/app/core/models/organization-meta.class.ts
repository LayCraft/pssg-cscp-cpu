import { iContactInformation, ContactInformation } from './contact-information.class';

export interface iOrganizationMeta {
  userId: string;
  organizationId: string;
  organizationName: string;
  contracts: string[];
  contactInformation: iContactInformation;
}
export class OrganizationMeta implements iOrganizationMeta {
  userId: string;
  organizationId: string;
  organizationName: string;
  contracts: string[];
  contactInformation: iContactInformation = new ContactInformation();
}

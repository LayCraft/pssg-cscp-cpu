import { iContactInformation, ContactInformation } from './contact-information.class';

export interface iOrganizationMeta {
  accountId: string; // this is the ID to identify an organization in dynamics. NOT A BCEID
  contactInformation: iContactInformation;
  contracts: string[];
  organizationId: string;
  organizationName: string;
  userId: string;
}
export class OrganizationMeta implements iOrganizationMeta {
  accountId: string; // this is the ID to identify an organization in dynamics. NOT A BCEID
  contactInformation: iContactInformation = new ContactInformation();
  contracts: string[];
  organizationId: string;
  organizationName: string;
  userId: string;
}

import { iContactInformation, ContactInformation } from './contact-information.class';

export interface iOrganizationMeta {
  "@odata.etag": string;
  organizationId: string;
  organizationName: string;
  contracts: string[];
  contactInformation: iContactInformation;
}
export class OrganizationMeta {
  "@odata.etag": string;
  organizationId: string;
  organizationName: string;
  contracts: string[];
  contactInformation: iContactInformation = new ContactInformation();
}

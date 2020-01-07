import { iContactInformation } from './contact-information.interface';

export interface iOrganizationMeta {
  accountId: string; // this is the ID to identify an organization in dynamics. NOT A BCEID
  contactInformation: iContactInformation;
  contracts: string[];
  organizationId: string;
  organizationName: string;
  userId: string;
}

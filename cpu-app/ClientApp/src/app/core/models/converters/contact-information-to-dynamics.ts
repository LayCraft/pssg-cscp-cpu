import { iDynamicsPostOrg } from "../dynamics-post";
import { Transmogrifier } from "../transmogrifier.class";

// this is a mapper function for posting the organization back to dynamics
export function convertContactInformationToDynamics(trans: Transmogrifier): iDynamicsPostOrg {
  return {
    BusinessBCeID: trans.organizationMeta.organizationId,
    UserBCeID: trans.organizationMeta.userId,
    Organization: {
      vsd_BoardContactIdfortunecookiebind: trans.organizationMeta.contactInformation.boardContact.personId || null,
      emailaddress1: trans.organizationMeta.contactInformation.emailAddress || null,
      vsd_ExecutiveContactIdfortunecookiebind: trans.organizationMeta.contactInformation.executiveContact.personId || null,
      fax: trans.organizationMeta.contactInformation.faxNumber || null,
      address2_city: trans.organizationMeta.contactInformation.mailingAddress.city || null,
      address2_line1: trans.organizationMeta.contactInformation.mailingAddress.line1 || null,
      address2_line2: trans.organizationMeta.contactInformation.mailingAddress.line2 || null,
      address2_postalcode: trans.organizationMeta.contactInformation.mailingAddress.postalCode || null,
      address2_stateorprovince: trans.organizationMeta.contactInformation.mailingAddress.province || null,
      address1_city: trans.organizationMeta.contactInformation.mainAddress.city || null,
      address1_line1: trans.organizationMeta.contactInformation.mainAddress.line1 || null,
      address1_line2: trans.organizationMeta.contactInformation.mainAddress.line2 || null,
      address1_postalcode: trans.organizationMeta.contactInformation.mainAddress.postalCode || null,
      address1_stateorprovince: trans.organizationMeta.contactInformation.mainAddress.province || null,
      telephone1: trans.organizationMeta.contactInformation.phoneNumber || null,
      accountid: trans.organizationMeta.accountId || null,
    }
  };
}

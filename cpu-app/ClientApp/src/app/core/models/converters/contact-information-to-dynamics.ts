import { iDynamicsOrganization } from "../dynamics-blob";
import { iContactInformation } from "../contact-information.interface";
import { iDynamicsPostOrg } from "../dynamics-post";

// this is a mapper function for posting the organization back to dynamics
export function convertContactInformationToDynamics(userId: string, organizationId: string, accountId: string, f: iContactInformation): iDynamicsPostOrg {
  const org: iDynamicsOrganization = {};
  // map contact info to the dynamics format
  if (f.boardContact && f.boardContact.personId) org.vsd_BoardContactIdfortunecookiebind = f.boardContact.personId;
  if (f.emailAddress) org.emailaddress1 = f.emailAddress;
  if (f.executiveContact && f.executiveContact.personId) org.vsd_ExecutiveContactIdfortunecookiebind = f.executiveContact.personId;
  if (f.faxNumber) org.fax = f.faxNumber;
  if (f.mailingAddress && f.mailingAddress.city) org.address2_city = f.mailingAddress.city;
  if (f.mailingAddress && f.mailingAddress.line1) org.address2_line1 = f.mailingAddress.line1;
  if (f.mailingAddress && f.mailingAddress.line2) org.address2_line2 = f.mailingAddress.line2;
  if (f.mailingAddress && f.mailingAddress.postalCode) org.address2_postalcode = f.mailingAddress.postalCode;
  if (f.mailingAddress && f.mailingAddress.province) org.address2_stateorprovince = f.mailingAddress.province;
  if (f.mainAddress && f.mainAddress.city) org.address1_city = f.mainAddress.city;
  if (f.mainAddress && f.mainAddress.line1) org.address1_line1 = f.mainAddress.line1;
  if (f.mainAddress && f.mainAddress.line2) org.address1_line2 = f.mainAddress.line2;
  if (f.mainAddress && f.mainAddress.postalCode) org.address1_postalcode = f.mainAddress.postalCode;
  if (f.mainAddress && f.mainAddress.province) org.address1_stateorprovince = f.mainAddress.province;
  if (f.phoneNumber) org.telephone1 = f.phoneNumber;
  // add the account id to the object
  org["accountid"] = accountId;
  return {
    BusinessBCeID: organizationId,
    UserBCeID: userId,
    Organization: org,
  } as iDynamicsPostOrg;
}

import { iDynamicsOrganization } from "./dynamics-blob";
import { iContactInformation } from "./contact-information.class";

export interface iDynamicsPostOrg {
  "BCeID": string;
  "Organization": iDynamicsOrganization;
}
// this is a mapper function for posting back to dynamics
export function DynamicsPostOrg(bceid: string, organizationId: string, f: iContactInformation): iDynamicsPostOrg {
  const org: iDynamicsOrganization = {};
  // map contact info to the dynamics format
  //TODO: these must be accepted but are not through the API. Commenting them out until they are implemented.
  // if (f.boardContact) org["_vsd_boardcontactid_value"] = f.boardContact.personId;
  // if (f.executiveContact) org["_vsd_executivecontactid_value"] = f.executiveContact.personId;
  if (f.emailAddress) org["emailaddress1"] = f.emailAddress;
  if (f.faxNumber) org["fax"] = f.faxNumber;
  if (f.mailingAddress) org["address2_city"] = f.mailingAddress.city;
  if (f.mainAddress) org["address1_city"] = f.mainAddress.city;
  if (f.mainAddress) org["address1_line1"] = f.mainAddress.line1;
  if (f.mainAddress) org["address1_line2"] = f.mainAddress.line2;
  if (f.mainAddress) org["address1_postalcode"] = f.mainAddress.postalCode;
  if (f.mainAddress) org["address1_stateorprovince"] = f.mainAddress.province;
  if (f.phoneNumber) org["telephone1"] = f.phoneNumber;
  if (f.mailingAddress) org["address2_line1"] = f.mailingAddress.line1;
  if (f.mailingAddress) org["address2_line2"] = f.mailingAddress.line2;
  if (f.mailingAddress) org["address2_postalcode"] = f.mailingAddress.postalCode;
  if (f.mailingAddress) org["address2_stateorprovince"] = f.mailingAddress.province;
  // add the account id
  org["accountid"] = organizationId;

  return {
    BCeID: bceid,
    Organization: org
  } as iDynamicsPostOrg;
}

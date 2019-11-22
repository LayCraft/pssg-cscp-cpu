import { iDynamicsOrganization, iDynamicsCrmContact } from "./dynamics-blob";
import { iContactInformation } from "./contact-information.class";
import { iPerson } from "./person.class";
export interface iDynamicsPostOrg {
  "UserBCeID": string;
  "BusinessBCeID": string;
  "Organization": iDynamicsOrganization;
}
export interface iDynamicsPostUsers {
  "UserBCeID": string;
  "BusinessBCeID": string;
  "StaffCollection": iDynamicsCrmContact[];
}
// this is a mapper function for posting back to dynamics
export function DynamicsPostOrganization(userId: string, organizationId: string, accountId: string, f: iContactInformation): iDynamicsPostOrg {
  const org: iDynamicsOrganization = {};
  // map contact info to the dynamics format
  //TODO: these must be accepted but are not through the API. Commenting them out until they are implemented.
  if (f.boardContact && f.boardContact.personId) org["vsd_BoardContactIdfortunecookiebind"] = f.boardContact.personId;
  if (f.executiveContact && f.executiveContact.personId) org["vsd_ExecutiveContactIdfortunecookiebind"] = f.executiveContact.personId;
  if (f.emailAddress) org["emailaddress1"] = f.emailAddress;
  if (f.faxNumber) org["fax"] = f.faxNumber;
  if (f.phoneNumber) org["telephone1"] = f.phoneNumber;
  if (f.mailingAddress && f.mailingAddress.city) org["address2_city"] = f.mailingAddress.city;
  if (f.mailingAddress && f.mailingAddress.line1) org["address2_line1"] = f.mailingAddress.line1;
  if (f.mailingAddress && f.mailingAddress.line2) org["address2_line2"] = f.mailingAddress.line2;
  if (f.mailingAddress && f.mailingAddress.postalCode) org["address2_postalcode"] = f.mailingAddress.postalCode;
  if (f.mailingAddress && f.mailingAddress.province) org["address2_stateorprovince"] = f.mailingAddress.province;
  if (f.mainAddress && f.mainAddress.city) org["address1_city"] = f.mainAddress.city;
  if (f.mainAddress && f.mainAddress.line1) org["address1_line1"] = f.mainAddress.line1;
  if (f.mainAddress && f.mainAddress.line2) org["address1_line2"] = f.mainAddress.line2;
  if (f.mainAddress && f.mainAddress.postalCode) org["address1_postalcode"] = f.mainAddress.postalCode;
  if (f.mainAddress && f.mainAddress.province) org["address1_stateorprovince"] = f.mainAddress.province;
  // add the account id to the object
  org["accountid"] = accountId;
  return {
    BusinessBCeID: organizationId,
    UserBCeID: userId,
    Organization: org,
  } as iDynamicsPostOrg;
}
export function DynamicsPostUsers(userId: string, organizationId: string, people: iPerson[]): iDynamicsPostUsers {
  const ppl: iDynamicsCrmContact[] = [];
  for (let person of people) {
    // convert the person to a contact
    const p: iDynamicsCrmContact = convertPersonToCrmContact(person);
    // add person to the collection
    ppl.push(p);
  }
  return {
    UserBCeID: userId,
    BusinessBCeID: organizationId,
    StaffCollection: ppl
  } as iDynamicsPostUsers;
}

export function convertPersonToCrmContact(person: iPerson): iDynamicsCrmContact {
  const p: iDynamicsCrmContact = {};
  // add all properties that are non null
  if (person.address && person.address.city) p["address1_city"] = person.address.city;
  if (person.address && person.address.line1) p["address1_line1"] = person.address.line1;
  if (person.address && person.address.line2) p["address1_line2"] = person.address.line2;
  if (person.address && person.address.postalCode) p["address1_postalcode"] = person.address.postalCode;
  if (person.address && person.address.province) p["address1_stateorprovince"] = person.address.province;
  if (person.personId) p["contactid"] = person.personId;
  if (person.email) p["emailaddress1"] = person.email;
  if (person.fax) p["fax"] = person.fax;
  if (person.firstName) p["firstname"] = person.firstName;
  if (person.title) p["jobtitle"] = person.title;
  if (person.lastName) p["lastname"] = person.lastName;
  if (person.middleName) p["middlename"] = person.middleName;
  if (person.phone) p["mobilephone"] = person.phone;
  if (person.deactivated) p["statecode"] = 1; // sending a 1 statuscode means soft delete the record
  // return the person
  return p;
}

import { iDynamicsOrganization, iDynamicsCrmContact } from "./dynamics-blob";
import { iContactInformation } from "./contact-information.class";
import { iPerson } from "./person.class";
import { iDynamicsScheduleG, iDynamicsScheduleGLineItem } from "./dynamics-schedule-g-response";
import { iExpenseReport } from "./transmogrifier-expense-report.class";

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
export interface iDynamicsPostScheduleG {
  "UserBCeID": string;
  "BusinessBCeID": string;
  "ScheduleGCollection": iDynamicsScheduleG[];
  "ScheduleGLineItemCollection": iDynamicsScheduleGLineItem[];
}
// this is a mapper function for posting back to dynamics
export function DynamicsPostOrganization(userId: string, organizationId: string, accountId: string, f: iContactInformation): iDynamicsPostOrg {
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
  if (person.address && person.address.city) p.address1_city = person.address.city;
  if (person.address && person.address.line1) p.address1_line1 = person.address.line1;
  if (person.address && person.address.line2) p.address1_line2 = person.address.line2;
  if (person.address && person.address.postalCode) p.address1_postalcode = person.address.postalCode;
  if (person.address && person.address.province) p.address1_stateorprovince = person.address.province;
  if (person.deactivated) p.statecode = 1; // sending a 1 statuscode means soft delete the record
  if (person.email) p.emailaddress1 = person.email;
  if (person.fax) p.fax = person.fax;
  if (person.firstName) p.firstname = person.firstName;
  if (person.lastName) p.lastname = person.lastName;
  if (person.middleName) p.middlename = person.middleName;
  if (person.personId) p.contactid = person.personId;
  if (person.phone) p.mobilephone = person.phone;
  if (person.title) p.jobtitle = person.title;
  // return the person
  return p;
}
export function iDynamicsPostScheduleG(userId: string, organizationId: string, expenseReportId: string, e: iExpenseReport): iDynamicsPostScheduleG {
  // schedule g's
  const g: iDynamicsScheduleG = {};

  if (e.administrationValue) g.vsd_programadministrationcurrentquarter = e.administrationValue;
  // administration costs
  if (e.administrationAnnualBudget) g.vsd_yeartodateprogramadministration = e.administrationAnnualBudget;
  if (e.administrationDescription) g.vsd_programadministrationexplanation = e.administrationDescription;
  if (e.administrationQuarterlyBudget) g.vsd_quarterlybudgetedprogramadministration = e.administrationQuarterlyBudget;
  if (e.administrationValue) g.vsd_programadministrationcurrentquarter = e.administrationValue;

  // program delivery costs
  if (e.programDeliveryAnnualBudget) g.vsd_yeartodateprogramdelivery = e.programDeliveryAnnualBudget;
  if (e.programDeliveryDescription) g.vsd_programdeliveryexplanations = e.programDeliveryDescription;
  if (e.programDeliveryQuarterlyBudget) g.vsd_quarterlybudgetedprogramdelivery = e.programDeliveryQuarterlyBudget;
  if (e.programDeliveryValue) g.vsd_programdeliverycurrentquarter = e.programDeliveryValue;

  // salaries and benefits costs
  if (e.salariesBenefitsAnnualBudget) g.vsd_yeartodatesalariesandbenefits = e.salariesBenefitsAnnualBudget;
  if (e.salariesBenefitsDescription) g.vsd_salariesandbenefitsexplanation = e.salariesBenefitsDescription;
  if (e.salariesBenefitsQuarterlyBudget) g.vsd_quarterlybudgetedsalariesbenefits = e.salariesBenefitsQuarterlyBudget;
  if (e.salariesBenefitsValue) g.vsd_salariesbenefitscurrentquarter = e.salariesBenefitsValue;

  // contract service hours
  if (e.contractServiceHoursQuarterlyActual) g.vsd_actualhoursthisquarter = e.contractServiceHoursQuarterlyActual;
  if (e.contractServiceHoursPerWeek) g.vsd_contractedservicehrsthisquarter = e.contractServiceHoursPerWeek;
  if (e.contractServiceHoursPerQuarter) g.vsd_cpu_numberofhours = e.contractServiceHoursPerQuarter;
  if (e.executiveReview) g.vsd_reportreviewed = e.executiveReview;

  // save the identifier for this form
  if (expenseReportId) g.vsd_schedulegid = expenseReportId;

  // schedule g line items;
  const glis: iDynamicsScheduleGLineItem[] = [];
  for (let y of e.programExpenseLineItems) {
    const lineItem: iDynamicsScheduleGLineItem = {
      vsd_scheduleglineitemid: expenseReportId,
      vsd_actualexpensescurrentquarter: y.actual || 0,
    };
    glis.push(lineItem);
  }

  return {
    BusinessBCeID: organizationId,
    UserBCeID: userId,
    ScheduleGCollection: [g],
    ScheduleGLineItemCollection: glis,
  } as iDynamicsPostScheduleG;
}

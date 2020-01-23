import { iDynamicsSchedule } from "../dynamics-blob";
import { TransmogrifierProgramApplication } from "../transmogrifier-program-application.class";
import { iProgramApplication } from "../program-application.interface";
import { convertHoursToDynamics } from "./hours-to-dynamics";
import { iHours } from "../hours.interface";
import { iDynamicsScheduleFPost, iDynamicsProgramContactPost } from "../dynamics-post";
import { iPerson } from "../person.interface";

export function convertProgramApplicationToDynamics(trans: TransmogrifierProgramApplication): iDynamicsScheduleFPost {
  const post: iDynamicsScheduleFPost = {
    Businessbceid: trans.organizationId,
    Userbceid: trans.userId,
    ContractCollection: [{
      vsd_ContactLookup1fortunecookiebind: trans.contactInformation.executiveContact.personId,
      vsd_ContactLookup2fortunecookiebind: trans.contactInformation.boardContact.personId,
      vsd_contractid: trans.contractId,
      vsd_cpu_specificunion: trans.administrativeInformation.staffUnion,
    }],
    Organization: {
      address1_city: trans.contactInformation.mainAddress.city,
      address1_country: trans.contactInformation.mainAddress.country,
      address1_line1: trans.contactInformation.mainAddress.line1,
      address1_line2: trans.contactInformation.mainAddress.line2,
      address1_postalcode: trans.contactInformation.mainAddress.postalCode,
      address1_stateorprovince: trans.contactInformation.mainAddress.province,
      address2_city: trans.contactInformation.mailingAddress.city,
      address2_country: trans.contactInformation.mailingAddress.country,
      address2_line1: trans.contactInformation.mailingAddress.line1,
      address2_line2: trans.contactInformation.mailingAddress.line2,
      address2_postalcode: trans.contactInformation.mailingAddress.postalCode,
      address2_stateorprovince: trans.contactInformation.mailingAddress.province,
      emailaddress1: trans.contactInformation.emailAddress,
      fax: trans.contactInformation.faxNumber,
      name: trans.organizationName,
      telephone1: trans.contactInformation.phoneNumber,
      accountid: trans.accountId,
    },
  };

  const programContactCollection: iDynamicsProgramContactPost[] = [];
  trans.programApplications.forEach((pa: iProgramApplication) => {
    // in each program add the list of staff by their id
    pa.additionalStaff.forEach((s: iPerson): void => {
      const contact: iDynamicsProgramContactPost = {
        contactid: s.personId,
        vsd_programid: pa.programId,
      };
      // add the contact
      programContactCollection.push(contact);
    });
  });
  // if there are elements in the array add the item.
  if (programContactCollection.length) post.ProgramContactCollection = programContactCollection;

  const programCollection = [];
  trans.programApplications.forEach((p: iProgramApplication) => {
    // push programs into program collection
    programCollection.push({
      vsd_addressline1: p.mainAddress.line1,
      vsd_addressline2: p.mainAddress.line2,
      vsd_city: p.mainAddress.city,
      vsd_country: p.mainAddress.country,
      vsd_emailaddress: p.email,
      vsd_fax: p.faxNumber,
      vsd_mailingaddressline1: p.mailingAddress.line1,
      vsd_mailingaddressline2: p.mailingAddress.line2,
      vsd_mailingcity: p.mailingAddress.city,
      vsd_mailingcountry: p.mailingAddress.country,
      vsd_mailingpostalcodezip: p.mailingAddress.postalCode,
      vsd_mailingprovincestate: p.mailingAddress.province,
      vsd_phonenumber: p.phoneNumber,
      vsd_postalcodezip: p.mainAddress.postalCode,
      vsd_programid: p.programId,
      vsd_provincestate: p.mainAddress.province,
    });
    // if there are elements in the array add the item.
    if (programCollection.length) post.ProgramCollection = programCollection;

    // push hours into schedule collection
    const scheduleCollection = [];
    p.operationHours
      .map((h: iHours): iDynamicsSchedule => convertHoursToDynamics(h, p.programId))
      .forEach((d: iDynamicsSchedule) => scheduleCollection.push(d));
    p.standbyHours
      .map((h: iHours): iDynamicsSchedule => convertHoursToDynamics(h, p.programId, true))
      .forEach((d: iDynamicsSchedule) => scheduleCollection.push(d));
    // if there are elements in the schedule collection then add them to the post
    if (scheduleCollection.length) post.ScheduleCollection = scheduleCollection;
  });
  return post;
}


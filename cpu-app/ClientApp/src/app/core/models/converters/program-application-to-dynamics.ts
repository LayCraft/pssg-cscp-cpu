import { iDynamicsScheduleFPost, iDynamicsOrganization, iDynamicsSchedule } from "../dynamics-blob";
import { TransmogrifierProgramApplication } from "../transmogrifier-program-application.class";
import { iProgramApplication } from "../program-application.interface";
import { convertHoursToDynamics } from "./hours-to-dynamics";
import { iHours } from "../hours.interface";
import { convertContactInformationToDynamics } from "./contact-information-to-dynamics";

export function convertProgramApplicationToDynamics(trans: TransmogrifierProgramApplication): iDynamicsScheduleFPost {
  const post: iDynamicsScheduleFPost = {
    Businessbceid: trans.organizationId,
    Userbceid: trans.userId,
    Contract: {
      vsd_contractid: trans.contractId,
    },
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
    },
    ExecutiveContact: {
      address1_city: trans.contactInformation.executiveContact.address.city,
      address1_country: trans.contactInformation.executiveContact.address.country,
      address1_line1: trans.contactInformation.executiveContact.address.line1,
      address1_line2: trans.contactInformation.executiveContact.address.line2,
      address1_postalcode: trans.contactInformation.executiveContact.address.postalCode,
      address1_stateorprovince: trans.contactInformation.executiveContact.address.province,
      contactid: trans.contactInformation.executiveContact.personId,
      emailaddress1: trans.contactInformation.executiveContact.email,
      firstname: trans.contactInformation.executiveContact.firstName,
      jobtitle: trans.contactInformation.executiveContact.title,
      lastname: trans.contactInformation.executiveContact.lastName,
      middlename: trans.contactInformation.executiveContact.middleName,
      fax: trans.contactInformation.executiveContact.fax,
      mobilephone: trans.contactInformation.executiveContact.phone,
      vsd_bceid: trans.contactInformation.executiveContact.userId,
      vsd_contact_vsd_programid: null,
    },
    BoardContact: {
      address1_city: trans.contactInformation.boardContact.address.city,
      address1_country: trans.contactInformation.boardContact.address.country,
      address1_line1: trans.contactInformation.boardContact.address.line1,
      address1_line2: trans.contactInformation.boardContact.address.line2,
      address1_postalcode: trans.contactInformation.boardContact.address.postalCode,
      address1_stateorprovince: trans.contactInformation.boardContact.address.province,
      contactid: trans.contactInformation.boardContact.personId,
      emailaddress1: trans.contactInformation.boardContact.email,
      firstname: trans.contactInformation.boardContact.firstName,
      jobtitle: trans.contactInformation.boardContact.title,
      lastname: trans.contactInformation.boardContact.lastName,
      middlename: trans.contactInformation.boardContact.middleName,
      fax: trans.contactInformation.boardContact.fax,
      mobilephone: trans.contactInformation.boardContact.phone,
      vsd_bceid: trans.contactInformation.boardContact.userId,
      vsd_contact_vsd_programid: null,
    },
    ProgramCollection: [],
    ScheduleCollection: [],
    ProgramContactCollection: [],
    RegionDistrictCollection: [],
    StaffCollection: [],
  };
  trans.programApplications.forEach((p: iProgramApplication) => {
    // push programs into program collection
    post.ProgramCollection.push({
      _vsd_contactlookup_value: p.programContact.personId,
      _vsd_contractid_value: trans.contractId,
      _vsd_programtype_value: null, // does this have a value?
      _vsd_cpu_regiondistrict_value: p.programLocation,
      _vsd_cpu_regiondistrictlookup2_value: p.programLocation,
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
      vsd_name: p.name,
      vsd_phonenumber: p.phoneNumber,
      vsd_postalcodezip: p.mainAddress.postalCode,
      vsd_programid: p.programId,
      vsd_provincestate: p.mainAddress.province
    });
    // push hours into schedule collection
    p.operationHours
      .map((h: iHours): iDynamicsSchedule => convertHoursToDynamics(h, p.programId))
      .forEach((d: iDynamicsSchedule) => post.ScheduleCollection.push(d));
    p.standbyHours
      .map((h: iHours): iDynamicsSchedule => convertHoursToDynamics(h, p.programId, true))
      .forEach((d: iDynamicsSchedule) => post.ScheduleCollection.push(d));
  });
  return post;
}


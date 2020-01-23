import { iDynamicsScheduleFPost, iDynamicsOrganization, iDynamicsSchedule } from "../dynamics-blob";
import { TransmogrifierProgramApplication } from "../transmogrifier-program-application.class";
import { iProgramApplication } from "../program-application.interface";
import { convertHoursToDynamics } from "./hours-to-dynamics";
import { iHours } from "../hours.interface";

export function convertProgramApplicationToDynamics(trans: TransmogrifierProgramApplication): iDynamicsScheduleFPost {
  const post: iDynamicsScheduleFPost = {
    Businessbceid: trans.organizationId,
    Userbceid: trans.userId,
    ContractCollection: [{
      // TODO: lookup fields need update in back end
      _vsd_contactlookup1_value: trans.contactInformation.executiveContact.personId,
      // TODO: lookup fields need update in back end
      _vsd_contactlookup2_value: trans.contactInformation.boardContact.personId,
      vsd_contractid: trans.contractId,
      vsd_cpu_specificunion: trans.administrativeInformation.staffUnion,
      // vsd_name: trans.contractName,
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
    ProgramCollection: [],
    ScheduleCollection: [],
    ProgramContactCollection: [],
    RegionDistrictCollection: [],
    StaffCollection: [],
  };
  trans.programApplications.forEach((p: iProgramApplication) => {
    // push programs into program collection
    post.ProgramCollection.push({
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
      // _vsd_contactlookup_value: p.programContact.personId,
      // _vsd_contractid_value: trans.contractId,
      // _vsd_cpu_regiondistrict_value: p.programLocation,
      // _vsd_cpu_regiondistrictlookup2_value: p.programLocation,
      // _vsd_programtype_value: null, // does this have a value?
      // _vsd_serviceproviderid_value: null,
      // statecode: null,
      // statuscode: null,
      // vsd_name: p.name,
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


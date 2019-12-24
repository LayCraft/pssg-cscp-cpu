// This is what we expect dynamics to dump on us.
// to make changes to how this comes in. we should make a change here, to the transmogrifier, and to the postback converter function that lives in the transmogrifier file
// The strategy is to get the dynamics things which include a bunch of messy useless information and then construct a matching transmogrifier
// Dynamics is returning giant collections of information that represent the entire collection of data for an entity instead of a single resource.
// the transmogrifier lets us manage the properties in the view models.
// When we want to send it back to dynamics we use a converter function to map the data in a way that Dynamics expects to recieve.

// Basically Dynamics API gets all data from an entity without any restrictions which can result in a massive amount of data coming for minor updates.
// So

export interface iDynamicsOrganization {
  _ownerid_value?: string;
  _vsd_boardcontactid_value?: string;
  _vsd_executivecontactid_value?: string;
  accountid?: string;
  address1_city?: string;
  address1_country?: string;
  address1_line1?: string;
  address1_line2?: string;
  address1_postalcode?: string;
  address1_stateorprovince?: string;
  address2_city?: string;
  address2_country?: string;
  address2_line1?: string;
  address2_line2?: string;
  address2_postalcode?: string;
  address2_stateorprovince?: string;
  emailaddress1?: string;
  fax?: string;
  name?: string;
  telephone1?: string;
  vsd_BoardContactIdfortunecookiebind?: string;
  vsd_ExecutiveContactIdfortunecookiebind?: string;
}
export interface iDynamicsCrmContact {
  _parentcustomerid_value?: string;
  address1_city?: string;
  address1_country?: string;
  address1_line1?: string;
  address1_line2?: string;
  address1_postalcode?: string;
  address1_stateorprovince?: string;
  contactid?: string;
  emailaddress1?: string;
  fax?: string;
  firstname?: string;
  fortunecookieetag?: string;
  fortunecookietype?: string;
  jobtitle?: string;
  lastname?: string;
  middlename?: string;
  mobilephone?: string;
  statecode?: number;
  vsd_bceid?: string;
  vsd_contact_vsd_programid?: string; // added when contact is listed in a program. Which program id are they under
  vsd_programid?: string; // added when contact is listed in a program
}
export interface iDynamicsCrmContract {
  _vsd_contactlookup1_value?: string;
  _vsd_contactlookup2_value?: string;
  _vsd_customer_value?: string;
  fortunecookieetag?: string;
  fortunecookietype?: string;
  statuscode?: number;
  vsd_contractid?: string;
  vsd_cpu_humanresourcepolicies?: string; // this is actually an array that comes in wrong
  vsd_cpu_insuranceoptions?: number;
  vsd_cpu_memberofcssea?: string;
  vsd_cpu_programstaffsubcontracted?: boolean;
  vsd_cpu_specificunion?: string;
  vsd_cpu_staffunionized?: boolean;
  vsd_name?: string;
}
export interface iDynamicsMinistryUser {
  address1_telephone1?: string;
  firstname?: string;
  fortunecookieetag?: string;
  internalemailaddress?: string;
  lastname?: string;
  ownerid?: string;
  systemuserid?: string;
}
export interface iDynamicsCrmProgram {
  _vsd_contactlookup_value?: string;
  _vsd_contractid_value?: string;
  _vsd_cpu_regiondistrict_value?: string;
  _vsd_cpu_regiondistrictlookup2_value?: string;
  _vsd_programtype_value?: string;
  _vsd_serviceproviderid_value?: string;
  fortunecookieetag?: string;
  fortunecookietype?: string;
  statecode?: number;
  statuscode?: number;
  vsd_addressline1?: string;
  vsd_addressline2?: string;
  vsd_city?: string;
  vsd_country?: string;
  vsd_emailaddress?: string;
  vsd_fax?: string;
  vsd_mailingaddressline1?: string;
  vsd_mailingaddressline2?: string;
  vsd_mailingcity?: string;
  vsd_mailingcountry?: string;
  vsd_mailingpostalcodezip?: string;
  vsd_mailingprovincestate?: string;
  vsd_name?: string;
  vsd_phonenumber?: string;
  vsd_postalcodezip?: string;
  vsd_programid?: string;
  vsd_provincestate?: string;
  vsd_totaloncallstandbyhours?: number;
  vsd_totalscheduledhours?: number;
}
export interface iDynamicsCrmTask {
  _regardingobjectid_value?: string;
  _vsd_schedulegid_value?: string;
  _vsd_tasktypeid_value?: string;
  activityid?: string;
  description?: string;
  fortunecookieetag: string;
  fortunecookietype: string;
  scheduledend?: string;
  statecode?: number;
  statuscode?: number;
  subject?: string;
}
export interface iDynamicsBlob {
  BoardContact?: iDynamicsCrmContact,
  Businessbceid?: string; // represents the organization level BCeID.
  Contracts?: iDynamicsCrmContract[];
  ExecutiveContact?: iDynamicsCrmContact,
  IsSuccess?: true;
  MinistryUser?: iDynamicsMinistryUser;
  Organization?: iDynamicsOrganization;
  Programs?: iDynamicsCrmProgram[];
  Result?: string;
  Staff?: iDynamicsCrmContact[];
  Tasks?: iDynamicsCrmTask[]
  Userbceid?: string; // represents the user's BCeID.
  fortunecookiecontext?: string;
};

// SCHEDULE G STUFF
export interface iDynamicsScheduleG {
  fortunecookieetag?: string;
  fortunecookietype?: string;
  _vsd_serviceprovider_value?: string;
  _vsd_program_value?: string;
  _vsd_contract_value?: string;
  _vsd_contact_value?: string;
  _transactioncurrencyid_value?: string;

  vsd_programadministrationbudgeted?: number;
  vsd_programadministrationcurrentquarter?: number;
  vsd_programadministrationexplanation?: string;
  vsd_quarterlybudgetedprogramadministration?: number;
  vsd_yeartodateprogramadministration?: number;
  vsd_yeartodatevarianceprogramadministration?: number;
  vsd_quarterlyvarianceprogramadministration?: number;

  vsd_programdeliverybudgeted?: number;
  vsd_programdeliverycurrentquarter?: number;
  vsd_programdeliveryexplanations?: string;
  vsd_quarterlybudgetedprogramdelivery?: number;
  vsd_yeartodateprogramdelivery?: number;
  vsd_yeartodatevarianceprogramdelivery?: number;
  vsd_quarterlyvarianceprogramdelivery?: number;

  vsd_quarterlybudgetedsalariesbenefits?: number;
  vsd_salariesandbenefitsexplanation?: string;
  vsd_salariesbenefitscurrentquarter?: number;
  vsd_salaryandbenefitsbudgeted?: number;
  vsd_yeartodatesalariesandbenefits?: number;
  vsd_yeartodatevariancesalariesbenefits?: number;
  vsd_quarterlyvariancesalariesbenefits?: number;

  vsd_submitteddate?: string;

  vsd_schedulegid?: string;
  vsd_reportreviewed?: boolean;
  vsd_cpu_reportingperiod?: number;

  // number of hours contracted area
  vsd_cpu_numberofhours?: number;
  vsd_contractedservicehrsthisquarter?: number;
  vsd_actualhoursthisquarter?: number;
}
export interface iDynamicsScheduleGLineItem {
  fortunecookieetag?: string;
  fortunecookietype?: string;
  _transactioncurrencyid_value?: string;
  _vsd_expenselineitem_value?: string;
  _vsd_schedulegid_value?: string;
  vsd_actualexpendituresyeartodate?: number;
  vsd_scheduleglineitemid?: string;
  vsd_annualbudgetedamount?: number;
  vsd_quarterlybudgetedamount?: number;
  vsd_actualexpensescurrentquarter?: number;
  vsd_yeartodatevariance?: number;
  vsd_quarterlyvariance?: number;
}
export interface iDynamicsScheduleGResponse {
  fortunecookiecontext?: string;
  IsSuccess?: boolean;
  Result?: string;
  Userbceid?: string;
  Businessbceid?: string;
  ScheduleG?: iDynamicsScheduleG;
  ScheduleGLineItems?: iDynamicsScheduleGLineItem[];
}
export interface iDynamicsSchedule {
  _vsd_programid_value?: string;
  fortunecookieetag?: string;
  fortunecookietype?: string;
  vsd_days?: string;
  vsd_scheduledendtime?: string;
  vsd_scheduledstarttime?: string;
  vsd_scheduleid?: string;
  vsd_cpu_scheduletype?: number;
}
export interface iDynamicsScheduleFResponse {
  Userbceid?: string;
  StaffCollection?: iDynamicsCrmContact[];
  ScheduleCollection?: iDynamicsSchedule[];
  Result?: string;
  RegionDistrictCollection?: iDynamicsRegionDistrict[];
  ProgramContactCollection?: iDynamicsCrmContact[];
  ProgramCollection?: iDynamicsCrmProgram[];
  Organization?: iDynamicsOrganization;
  IsSuccess?: boolean;
  ExecutiveContact?: iDynamicsCrmContact;
  Contract?: iDynamicsCrmContract;
  Businessbceid: string;
  BoardContact?: iDynamicsCrmContact;
}
export interface iDynamicsRegionDistrict {
  vsd_name: string;
}

export interface iDynamicsPostScheduleG {
  UserBCeID: string;
  BusinessBCeID: string;
  ScheduleGCollection: iDynamicsScheduleG[];
  ScheduleGLineItemCollection: iDynamicsScheduleGLineItem[];
}
export interface iDynamicsPostOrg {
  UserBCeID: string;
  BusinessBCeID: string;
  Organization: iDynamicsOrganization;
}
export interface iDynamicsPostUsers {
  UserBCeID: string;
  BusinessBCeID: string;
  StaffCollection: iDynamicsCrmContact[];
}
export interface iDynamicsLineItem {
  itemId: string;
  label: string;
  annualBudget: number;
  quarterlyBudget: number;
  actual: number;
}
export interface iExpenseReport {
  // salary benefits program delivery and administration expense
  administrationDescription: string;
  administrationValue: number;
  administrationAnnualBudget: number;
  administrationQuarterlyBudget: number;

  programDeliveryDescription: string;
  programDeliveryValue: number;
  programDeliveryAnnualBudget: number;
  programDeliveryQuarterlyBudget: number;

  salariesBenefitsDescription: string;
  salariesBenefitsValue: number;
  salariesBenefitsAnnualBudget: number;
  salariesBenefitsQuarterlyBudget: number;

  programExpenseLineItems: iDynamicsLineItem[];

  contractServiceHoursPerWeek: number;
  contractServiceHoursPerQuarter: number;
  contractServiceHoursQuarterlyActual: number;
  executiveReview: boolean;
}

const foo: iDynamicsScheduleFResponse = {
  "IsSuccess": true,
  "Result": "CPU Schedule F found..",
  "Userbceid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  "Businessbceid": "fd889a40-14b2-e811-8163-480fcff4f621",
  "Contract": {
    "vsd_contractid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "_vsd_customer_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "vsd_cpu_specificunion": "this is a text value..",
    "vsd_name": "15092013-20",
    "_vsd_contactlookup2_value": "4a9824c3-286c-e911-b80c-00505683fbf4",
    "_vsd_contactlookup1_value": "4a9824c3-286c-e911-b80c-00505683fbf4"
  },
  "Organization": {
    "telephone1": "604-233-3433",
    "address1_city": "Burns Lake",
    "address2_city": "Burns Lake",
    "address2_line2": "P.O. Box 570",
    "address2_line1": "15 3rd Ave",
    "address2_stateorprovince": "British Columbia",
    "address2_postalcode": "V0J 1E1",
    "address1_postalcode": "V0J 1E0",
    "address1_stateorprovince": "British Columbia",
    "accountid": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "fax": "250-546-2922",
    "emailaddress1": "new111@burnslake.ca",
    "address2_country": "Canada",
    "address1_country": "Canada",
    "name": "Village of Burns Lake",
    "address1_line1": "#15 3rd",
    "address1_line2": "P.O. Box 570"
  },
  "ExecutiveContact": {
    "firstname": "Adam",
    "address1_city": "Alberta Beach",
    "address1_line1": "34564rwedsfgdsf st",
    "emailaddress1": "a.roger@gmail.com",
    "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "address1_stateorprovince": "Arizona",
    "middlename": "Of",
    "jobtitle": "Free Text",
    "address1_postalcode": "234532",
    "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
    "address1_country": "Azerbaijan",
    "lastname": "Rodger"
  },
  "BoardContact": {
    "firstname": "Adam",
    "address1_city": "Alberta Beach",
    "address1_line1": "34564rwedsfgdsf st",
    "emailaddress1": "a.roger@gmail.com",
    "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "address1_stateorprovince": "Arizona",
    "middlename": "Of",
    "jobtitle": "Free Text",
    "address1_postalcode": "234532",
    "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
    "address1_country": "Azerbaijan",
    "lastname": "Rodger"
  },
  "ProgramCollection": [{
    "statecode": 0,
    "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "vsd_totaloncallstandbyhours": 100.3000000000,
    "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
    "vsd_mailingpostalcodezip": "V0J 1E2",
    "vsd_country": "Algeria",
    "vsd_emailaddress": "Burnslake@rcmp.com",
    "vsd_mailingaddressline1": "2:147 Highway 35",
    "vsd_mailingaddressline2": "2:PO Box 759",
    "vsd_fax": "2508763452",
    "_vsd_contactlookup_value": "93341b5c-84d8-e811-815f-480fcff4f6a1",
    "statuscode": 100000006,
    "_vsd_programtype_value": "8a552ab9-09fc-e911-b812-00505683fbf4",
    "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "vsd_provincestate": "British Columbia",
    "vsd_programid": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_addressline1": "147 Highway 35",
    "vsd_addressline2": "PO Box 759",
    "vsd_city": "Athabasca County",
    "vsd_postalcodezip": "V0J1E0",
    "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
    "vsd_phonenumber": "2509483343",
    "vsd_mailingcity": "Beaver County",
    "vsd_mailingcountry": "Angola",
    "vsd_totalscheduledhours": 50.1000000000,
    "vsd_name": "Burns Lake RCMP Victim/Witness Assistance Program",
    "vsd_mailingprovincestate": "British Columbia"
  }, {
    "statecode": 0,
    "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
    "vsd_mailingpostalcodezip": "Y8N 4A5",
    "vsd_country": "Algeria",
    "vsd_emailaddress": "burnslake@burnslake.ca",
    "vsd_mailingaddressline1": "64783 South Street",
    "vsd_mailingaddressline2": "Address Line 2 Test",
    "vsd_fax": "3433334444",
    "_vsd_contactlookup_value": "4d028528-a3db-e911-b811-00505683fbf4",
    "statuscode": 100000006,
    "_vsd_programtype_value": "b8ec7744-17fc-e911-b812-00505683fbf4",
    "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "vsd_provincestate": "British Columbia",
    "vsd_programid": "1aae3dad-c4e6-e911-b811-00505683fbf4",
    "vsd_addressline1": "4566 West Street",
    "vsd_addressline2": "Line 2 Test",
    "vsd_city": "Beaver County",
    "vsd_postalcodezip": "V8Y 5A5",
    "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
    "vsd_phonenumber": "6048393333",
    "vsd_mailingcity": "Athabasca County",
    "vsd_mailingcountry": "Angola",
    "vsd_name": "Community Program 1",
    "vsd_mailingprovincestate": "British Columbia"
  }],
  "StaffCollection": [{
    "firstname": "Adam",
    "address1_city": "Alberta Beach",
    "address1_line1": "34564rwedsfgdsf st",
    "emailaddress1": "a.roger@gmail.com",
    "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "address1_stateorprovince": "Arizona",
    "middlename": "Of",
    "jobtitle": "Free Text",
    "address1_postalcode": "234532",
    "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
    "address1_country": "Azerbaijan",
    "lastname": "Rodger"
  }, {
    "address1_line1": "#15 3rd Ave",
    "address1_city": "Burns Lake",
    "middlename": "Joe",
    "address1_postalcode": "P.O. Box 570",
    "address1_stateorprovince": "British Columbia",
    "jobtitle": "Program Manager",
    "contactid": "4d028528-a3db-e911-b811-00505683fbf4",
    "firstname": "Grady",
    "mobilephone": "2503442234",
    "lastname": "Green",
    "fax": "250-363-394",
    "emailaddress1": "Bradley.Green@email.com",
    "address1_country": "Canada",
    "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "address1_line2": "P.O. Box 570"
  }, {
    "address1_line1": "Lakeview Mall",
    "address1_city": "Burns Lake",
    "middlename": "N",
    "address1_postalcode": "V0J 1E0",
    "address1_stateorprovince": "British Columbia",
    "jobtitle": "Board Contact",
    "contactid": "93341b5c-84d8-e811-815f-480fcff4f6a1",
    "firstname": "Bradley",
    "mobilephone": "6048392202",
    "lastname": "Lopez",
    "fax": "250-274-3894",
    "emailaddress1": "Bradley.Lopez@email.com",
    "address1_country": "Canada",
    "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "address1_line2": "Street Address 2 Test"
  }],
  "RegionDistrictCollection": [{
    "vsd_name": "Burns Lake Prov"
  }],
  "ScheduleCollection": [{
    "vsd_scheduledendtime": "17:00",
    "vsd_scheduledstarttime": "8:00",
    "vsd_days": "100000001,100000002",
    "vsd_scheduleid": "36e5bb9a-b3c9-e911-b80f-00505683fbf4",
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_cpu_scheduletype": 100000000
  }, {
    "vsd_scheduledendtime": "9:00",
    "vsd_scheduledstarttime": "8:00",
    "vsd_days": "100000000,100000001,100000002",
    "vsd_scheduleid": "fac3d600-2bf4-e911-b811-00505683fbf4",
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_cpu_scheduletype": 100000001
  }, {
    "vsd_scheduledendtime": "17:00",
    "vsd_scheduledstarttime": "8:00",
    "vsd_days": "100000000,100000001",
    "vsd_scheduleid": "ac3920c1-a513-ea11-b814-00505683fbf4",
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_cpu_scheduletype": 100000000
  }, {
    "vsd_scheduledendtime": "17:00",
    "vsd_scheduledstarttime": "8:00",
    "vsd_days": "100000000,100000001,100000002",
    "vsd_scheduleid": "eea6842d-a713-ea11-b814-00505683fbf4",
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_cpu_scheduletype": 100000001
  }, {
    "vsd_scheduleid": "f092d29f-b122-ea11-b814-00505683fbf4",
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_days": "100000000,100000001,100000002",
    "vsd_scheduledstarttime": "8:00",
    "vsd_scheduledendtime": "17:00"
  }, {
    "vsd_scheduleid": "9bdcbaeb-b122-ea11-b814-00505683fbf4",
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_days": "100000000,100000001,100000002",
    "vsd_scheduledstarttime": "8:00",
    "vsd_scheduledendtime": "17:00"
  }],
  "ProgramContactCollection": [{
    "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
    "vsd_programid": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_contact_vsd_programid": "2352509a-6123-ea11-b814-00505683fbf4"
  }]
}

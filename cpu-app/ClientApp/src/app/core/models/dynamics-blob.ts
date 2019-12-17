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
}
export interface iDynamicsCrmContract {
  _vsd_contactlookup1_value?: string;
  _vsd_contactlookup2_value?: string;
  _vsd_customer_value?: string;
  fortunecookieetag?: string;
  fortunecookietype?: string;
  statuscode?: number;
  vsd_contractid?: string;
  vsd_cpu_insuranceoptions?: number;
  vsd_cpu_memberofcssea?: string;
  vsd_cpu_programstaffsubcontracted?: boolean;
  vsd_cpu_specificunion?: string;
  vsd_cpu_staffunionized?: boolean;
  vsd_name?: string;
  vsd_cpu_humanresourcepolicies?: string; // this is actually an array that comes in wrong
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
}
export interface iDynamicsCrmTask {
  _regardingobjectid_value?: string;
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
  BoardContact?: iDynamicsCrmContact;
  Businessbceid: string;
  Contract?: iDynamicsCrmContract;
  ExecutiveContact?: iDynamicsCrmContact;
  IsSuccess?: boolean;
  Organization?: iDynamicsOrganization;
  ProgramCollection?: iDynamicsCrmProgram[];
  RegionDistrictCollection?: iDynamicsRegionDistrict[];
  Result?: string;
  ScheduleCollection?: iDynamicsSchedule[];
  StaffCollection?: iDynamicsCrmContact[];
  Userbceid?: string;
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

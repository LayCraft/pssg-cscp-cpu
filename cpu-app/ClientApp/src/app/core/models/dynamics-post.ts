import { iDynamicsCrmContact, iDynamicsCrmProgram, iDynamicsSchedule } from "./dynamics-blob";
import { iDynamicsDocument } from "./dynamics-file.interface";

export interface iDynamicsPostScheduleG {
  UserBCeID: string;
  BusinessBCeID: string;
  ScheduleGCollection: iDynamicsScheduleGPost[];
  ScheduleGLineItemCollection: iDynamicsScheduleGLineItemPost[];
}
export interface iDynamicsPostOrg {
  UserBCeID: string;
  BusinessBCeID: string;
  Organization: iDynamicsOrganizationPost;
}

export interface iDynamicsPostUsers {
  UserBCeID: string;
  BusinessBCeID: string;
  StaffCollection: iDynamicsCrmContact[];
}
export interface iDynamicsPostStatusReport {
  BusinessBCeID: string;
  UserBCeID: string;
  ReportingPeriod: number;
  AnswerCollection: iDynamicsAnswer[];
}
export interface iDynamicsAnswer {
  // the text of the question
  vsd_name: string;
  // text description of the question category
  vsd_questioncategory: string;
  vsd_questionorder: number;
  // is this a number boolean or string? Numerically encoded to dynamics.
  vsd_questiontype1: number;
  // answer
  vsd_number?: number;
  vsd_yesnoboolean?: boolean;
  vsd_textanswer?: string;
}

export interface iDynamicsBudgetProposalPost {
  BusinessBCeID: string;
  UserBCeID: string;
  ProgramExpenseCollection: iDynamicsProgramExpense[];
  ProgramRevenueSourceCollection: iDynamicsProgramRevenueSource[];
}
export interface iDynamicsProgramExpense {
  vsd_EligibleExpenseItemIdfortunecookiebind?: string;
  vsd_ProgramIdfortunecookiebind: string;
  vsd_cpu_benefits?: number;
  vsd_cpu_fundedfromvscp: number;
  vsd_cpu_otherexpense?: string;
  vsd_cpu_programexpensetype: number;
  vsd_cpu_salary?: number;
  vsd_cpu_titleposition?: string;
  vsd_inputamount?: number;
  vsd_programexpenseid?: string;
  vsd_totalcost?: number;
}
export interface iDynamicsProgramRevenueSource {
  vsd_ProgramIdfortunecookiebind: string;
  vsd_cashcontribution: number;
  vsd_cpu_revenuesourcetype: number;
  vsd_inkindcontribution: number;
  vsd_programrevenuesourceid?: string;
}
export interface iDynamicsCrmContractPost {
  vsd_ContactLookup1fortunecookiebind?: string;
  vsd_ContactLookup2fortunecookiebind?: string;
  _vsd_customer_value?: string;
  fortunecookieetag?: string;
  fortunecookietype?: string;
  statuscode?: number;
  vsd_contractid?: string;
  vsd_cpu_humanresourcepolicies?: string; // this is actually an array that comes in wrong
  vsd_cpu_insuranceoptions?: number;
  vsd_cpu_memberofcssea?: number;
  vsd_cpu_programstaffsubcontracted?: boolean;
  vsd_cpu_specificunion?: string;
  vsd_cpu_staffunionized?: boolean;
  vsd_name?: string;
}
export interface iDynamicsProgramContactPost {
  contactid: string;
  vsd_programid: string; // added when contact is listed in a program
}
export interface iDynamicsScheduleFPost {
  Businessbceid: string;
  ContractCollection?: iDynamicsCrmContractPost[];
  Organization?: iDynamicsOrganizationPost;
  ProgramCollection?: iDynamicsCrmProgram[];
  ProgramContactCollection?: iDynamicsProgramContactPost[];
  ScheduleCollection?: iDynamicsSchedule[];
  StaffCollection?: iDynamicsProgramContactPost[];
  Userbceid?: string;
}
export interface iDynamicsFilePost {
  Businessbceid: string;
  Userbceid: string;
  DocumentCollection?: iDynamicsDocument[];
}
export interface iDynamicsDocumentPost {
  filename: string;
  body: string;
}
export interface iDynamicsOrganizationPost {
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
  fortunecookieetag?: string;
  name?: string;
  telephone1?: string;
  vsd_BoardContactIdfortunecookiebind?: string;
  vsd_ExecutiveContactIdfortunecookiebind?: string;
  vsd_bceid: string;
}
export interface iDynamicsScheduleGPost {
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
export interface iDynamicsScheduleGLineItemPost {
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

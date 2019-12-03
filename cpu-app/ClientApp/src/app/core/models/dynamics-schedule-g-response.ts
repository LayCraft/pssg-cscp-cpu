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

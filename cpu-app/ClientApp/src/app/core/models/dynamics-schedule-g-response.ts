export interface iDynamicsScheduleGs {
  _transactioncurrencyid_value?: string;
  _vsd_contract_value?: string;
  _vsd_program_value?: string;
  _vsd_serviceprovider_value?: string;
  vsd_schedulegid?: string;
  vsd_cpu_reportingperiod?: number;
  vsd_programadministrationbudgeted?: number;
  vsd_programdeliverybudgeted?: number;
  vsd_quarterlybudgetedprogramadministration?: number;
  vsd_quarterlybudgetedprogramdelivery?: number;
  vsd_quarterlybudgetedsalariesbenefits?: number;
  vsd_salaryandbenefitsbudgeted?: number;
  vsd_yeartodateprogramadministration?: number;
  vsd_yeartodateprogramdelivery?: number;
  vsd_yeartodatesalariesandbenefits?: number;
  vsd_yeartodatevarianceprogramadministration?: number;
  vsd_yeartodatevarianceprogramdelivery?: number;
  vsd_yeartodatevariancesalariesbenefits?: number;
  vsd_reportreviewed?: boolean;
}
export interface iDynamicsScheduleGLineItems {
  _transactioncurrencyid_value?: string;
  _vsd_expenselineitem_value?: string;
  _vsd_schedulegid_value?: string;
  vsd_scheduleglineitemid?: string;
  vsd_annualbudgetedamount?: number;
  vsd_quarterlybudgetedamount?: number;
}
export interface iDynamicsScheduleGResponse {
  Userbceid?: string;
  Businessbceid?: string;
  ScheduleGs?: iDynamicsScheduleGs[];
  ScheduleGLineItems?: iDynamicsScheduleGLineItems[];
}

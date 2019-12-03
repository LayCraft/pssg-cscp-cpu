
// a collection of the expense item guids as K/V pairs for generating line items
const ExpenseItemLabels: {} = {
  "05D84E55-2EBA-E911-B80F-00505683FBF4": "Administration - Related Utilities",
  "B87E6400-2EBA-E911-B80F-00505683FBF4": "Administration-Related Rent/Lease/Mortgage",
  "4B7325D9-2DBA-E911-B80F-00505683FBF4": "Administrative Support Wages/Benefits",
  "53C1C560-2EBA-E911-B80F-00505683FBF4": "Bookkeeping/Bank Fees",
  "BD4ABCC6-2DBA-E911-B80F-00505683FBF4": "Management Salary/Benefits",
  "099C3B77-2DBA-E911-B80F-00505683FBF4": "Memberships",
  "7D48816D-2EBA-E911-B80F-00505683FBF4": "Other Administration Costs",
  "A5FE2187-2DBA-E911-B80F-00505683FBF4": "Other Program Related Expenses",
  "F070E090-2CBA-E911-B80F-00505683FBF4": "Phone",
  "B33CDA77-2CBA-E911-B80F-00505683FBF4": "Program Related - Office Supplies/Software",
  "18F4336E-2CBA-E911-B80F-00505683FBF4": "Program Related - Rent/Lease/Mortgage",
  "F7E71080-2CBA-E911-B80F-00505683FBF4": "Program Related - Travel",
  "32AD5D8A-2CBA-E911-B80F-00505683FBF4": "Program Related - Utilities",
  "121ED353-2DBA-E911-B80F-00505683FBF4": "Property Maintenance",
  "4DD7B12C-2DBA-E911-B80F-00505683FBF4": "Resource Materials/Printing Costs",
  "B4CD7AA0-2CBA-E911-B80F-00505683FBF4": "Staff Training and Associated Travel",
  "84415B3D-2DBA-E911-B80F-00505683FBF4": "Volunteer Appreciation/Honorariums",
}

export interface iDynamicsPostScheduleG {
  "UserBCeID": string;
  "BusinessBCeID": string;
  "ScheduleGCollection": iDynamicsScheduleG[];
  "ScheduleGLineItemCollection": iDynamicsScheduleGLineItem[];
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

  programExpenseLineItems: iLineItem[];

  contractServiceHoursPerWeek: number;
  contractServiceHoursPerQuarter: number;
  contractServiceHoursQuarterlyActual: number;
  executiveReview: boolean;
}
interface iLineItem {
  itemId: string;
  label: string;
  annualBudget: number;
  quarterlyBudget: number;
  actual: number;
}

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

export class TransmogrifierExpenseReport {
  public organizationId: string;
  public userId: string;
  public expenseReport: iExpenseReport;

  constructor(g: iDynamicsScheduleGResponse) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.expenseReport = this.buildExpenseReport(g);
  }
  buildExpenseReport(g: iDynamicsScheduleGResponse): iExpenseReport {
    // for every item in the schedule g's
    const e: iExpenseReport = {

      // administration costs
      administrationAnnualBudget: g.ScheduleG.vsd_yeartodateprogramadministration || 0,
      administrationDescription: g.ScheduleG.vsd_programadministrationexplanation || '',
      administrationQuarterlyBudget: g.ScheduleG.vsd_quarterlybudgetedprogramadministration || 0,
      administrationValue: Math.round(g.ScheduleG.vsd_programadministrationcurrentquarter) || 0,

      // program delivery costs
      programDeliveryAnnualBudget: g.ScheduleG.vsd_yeartodateprogramdelivery || 0,
      programDeliveryDescription: g.ScheduleG.vsd_programdeliveryexplanations || '',
      programDeliveryQuarterlyBudget: g.ScheduleG.vsd_quarterlybudgetedprogramdelivery || 0,
      programDeliveryValue: Math.round(g.ScheduleG.vsd_programdeliverycurrentquarter) || 0,

      // salaries and benefits costs
      salariesBenefitsAnnualBudget: g.ScheduleG.vsd_yeartodatesalariesandbenefits || 0,
      salariesBenefitsDescription: g.ScheduleG.vsd_salariesandbenefitsexplanation || '',
      salariesBenefitsQuarterlyBudget: g.ScheduleG.vsd_quarterlybudgetedsalariesbenefits || 0,
      salariesBenefitsValue: Math.round(g.ScheduleG.vsd_salariesbenefitscurrentquarter) || 0, //TODO

      // contract service hours
      contractServiceHoursQuarterlyActual: g.ScheduleG.vsd_actualhoursthisquarter || 0,
      contractServiceHoursPerWeek: g.ScheduleG.vsd_contractedservicehrsthisquarter || 0,
      contractServiceHoursPerQuarter: g.ScheduleG.vsd_cpu_numberofhours || 0,
      executiveReview: g.ScheduleG.vsd_reportreviewed || false,
      // placeholder
      programExpenseLineItems: [],
    };
    // for every item in the schedule g line items
    for (let item of g.ScheduleGLineItems) {
      // if the schedule G identifier guid matches the guid for the line items
      if (item._vsd_schedulegid_value === g.ScheduleG.vsd_schedulegid) {
        e.programExpenseLineItems.push({
          // get the correct label for the line from the list of constant values
          label: ExpenseItemLabels[item._vsd_expenselineitem_value.toUpperCase()] || "Unknown Line Item Type",
          annualBudget: item.vsd_annualbudgetedamount || 0,
          quarterlyBudget: item.vsd_quarterlybudgetedamount || 0,
          actual: Math.round(item.vsd_actualexpensescurrentquarter) || 0,
          itemId: item.vsd_scheduleglineitemid,
        });
      }
    }
    return e;
  }
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

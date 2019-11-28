import { iDynamicsScheduleGResponse } from "./dynamics-schedule-g-response";

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
}
interface iLineItem {
  label: string;
  annualBudget: number;
  quarterlyBudget: number;
  actual: number;
}

export class TransmogrifierExpenseReport {
  public organizationId: string;
  public userId: string;
  public expenseReports: iExpenseReport[];

  constructor(g: iDynamicsScheduleGResponse) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.expenseReports = this.buildExpenseReports(g);
  }
  buildExpenseReports(g: iDynamicsScheduleGResponse): iExpenseReport[] {
    const expenseReport: iExpenseReport[] = [];
    // for every item in the schedule g's
    for (let sched of g.ScheduleGs) {
      const e: iExpenseReport = {
        // administration costs
        administrationAnnualBudget: sched.vsd_yeartodateprogramadministration || 0,
        administrationDescription: sched.vsd_programadministrationexplanation || '',
        administrationQuarterlyBudget: sched.vsd_quarterlybudgetedprogramadministration || 0,
        administrationValue: 911, //TODO

        // program delivery costs
        programDeliveryAnnualBudget: sched.vsd_yeartodateprogramdelivery || 0,
        programDeliveryDescription: sched.vsd_programdeliveryexplanations || '',
        programDeliveryQuarterlyBudget: sched.vsd_quarterlybudgetedprogramdelivery || 0,
        programDeliveryValue: 911, //TODO

        // salaries and benefits costs
        salariesBenefitsAnnualBudget: sched.vsd_yeartodatesalariesandbenefits || 0,
        salariesBenefitsDescription: sched.vsd_salariesandbenefitsexplanation || '',
        salariesBenefitsQuarterlyBudget: sched.vsd_quarterlybudgetedsalariesbenefits || 0,
        salariesBenefitsValue: 911, //TODO

        // placeholder
        programExpenseLineItems: [],
      };
      // for every item in the schedule g line items
      for (let item of g.ScheduleGLineItems) {
        // if the schedule G identifier guid matches the guid for the line items
        if (item._vsd_schedulegid_value === sched.vsd_schedulegid) {
          e.programExpenseLineItems.push({
            // get the correct label for the line from the list of constant values
            label: ExpenseItemLabels[item._vsd_expenselineitem_value.toUpperCase()] || "Unknown Line Item Type",
            annualBudget: item.vsd_annualbudgetedamount || 0,
            quarterlyBudget: item.vsd_quarterlybudgetedamount || 0,
            actual: item.vsd_actualexpensescurrentquarter || 0,
          });
        }
      }
      // add to the collection
      expenseReport.push(e);
    }
    return expenseReport;
  }
}

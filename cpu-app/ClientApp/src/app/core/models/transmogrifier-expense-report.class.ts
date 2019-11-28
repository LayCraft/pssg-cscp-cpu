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
  administrationCostDescription: string;
  administrationCostValue: number;
  administrationCostAnnualBudget: number;
  administrationCostQuarterlyBudget: number;

  programDeliveryCostDescription: string;
  programDeliveryCostValue: number;
  programDeliveryCostAnnualBudget: number;
  programDeliveryCostQuarterlyBudget: number;

  salariesBenefitsCostDescription: string;
  salariesBenefitsCostValue: number;
  salariesBenefitsCostAnnualBudget: number;
  salariesBenefitsCostQuarterlyBudget: number;

  programTravelCostDescription: string;
  programTravelCostValue: number;
  programTravelCostAnnualBudget: number;
  programTravelCostQuarterlyBudget: number;

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
    // for every item in the schedule g's
    // for every item in the schedule g line items
    // if the schedule G identifier guid matches the guid for the line items
    // take the line item and determine which type it is
    // assign the values in the item into the correct fields for the type
    //label
    //annualBudget


  }
  buildExpenseReports(g: iDynamicsScheduleGResponse): iExpenseReport[] {
    return [];
  }
}

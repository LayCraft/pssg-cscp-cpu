
export interface iExpenseReport {
  expenseReportId?: string;
  // salary benefits program delivery and administration expense
  administrationDescription?: string;
  administrationValue?: number;
  administrationAnnualBudget?: number;
  administrationQuarterlyBudget?: number;
  administrationYearToDate?: number;

  programDeliveryDescription?: string;
  programDeliveryValue?: number;
  programDeliveryAnnualBudget?: number;
  programDeliveryQuarterlyBudget?: number;
  programDeliveryYearToDate?: number;

  salariesBenefitsDescription?: string;
  salariesBenefitsValue?: number;
  salariesBenefitsAnnualBudget?: number;
  salariesBenefitsQuarterlyBudget?: number;
  salariesBenefitsYearToDate?: number;

  programExpenseLineItems: iExpenseReportLineItem[];

  contractServiceHoursPerWeek?: number;
  contractServiceHoursPerQuarter?: number;
  contractServiceHoursQuarterlyActual?: number;
  executiveReview?: boolean;
}

export interface iExpenseReportLineItem {
  itemId: string;
  label: string;
  annualBudget: number;
  quarterlyBudget: number;
  actual: number;
}

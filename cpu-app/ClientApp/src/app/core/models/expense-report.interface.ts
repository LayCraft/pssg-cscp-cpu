
export interface iExpenseReport {
  expenseReportId?: string;
  // salary benefits program delivery and administration expense
  administrationDescription?: string;
  administrationAnnualBudget?: number;
  administrationQuarterlyBudget?: number;
  administrationValue?: number;
  administrationQuarterlyVariance?: number;
  administrationYearToDate?: number;
  administrationYearToDateVariance?: number;

  programDeliveryDescription?: string;
  programDeliveryAnnualBudget?: number;
  programDeliveryQuarterlyBudget?: number;
  programDeliveryValue?: number;
  programDeliveryQuarterlyVariance?: number;
  programDeliveryYearToDate?: number;
  programDeliveryYearToDateVariance?: number;

  salariesBenefitsDescription?: string;
  salariesBenefitsAnnualBudget?: number;
  salariesBenefitsQuarterlyBudget?: number;
  salariesBenefitsValue?: number;
  salariesBenefitsQuarterlyVariance?: number;
  salariesBenefitsYearToDate?: number;
  salariesBenefitsYearToDateVariance?: number;

  programExpenseLineItems: iExpenseReportLineItem[];

  serviceHours?: number;
  perType?: number,
  onCallStandByHours?: number;
  serviceHoursQuarterlyActual?: number;
  executiveReview?: boolean;
}

export interface iExpenseReportLineItem {
  itemId: string;
  label: string;
  annualBudget: number;
  quarterlyBudget: number;
  actual: number;
  quarterlyVariance: number;
  actualYearToDate: number;
  yearToDateVariance: number;
}

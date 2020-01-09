import { iDynamicsScheduleG, iDynamicsScheduleGLineItem } from "../dynamics-blob";
import { iDynamicsPostScheduleG } from "../dynamics-post";
import { iExpenseReport } from "../expense-report.interface";

export function convertExpenseReportToDynamics(userId: string, organizationId: string, expenseReportId: string, e: iExpenseReport): iDynamicsPostScheduleG {
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

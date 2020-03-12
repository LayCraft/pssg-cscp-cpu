import { iDynamicsScheduleG, iDynamicsScheduleGLineItem } from "../dynamics-blob";
import { iDynamicsPostScheduleG, iDynamicsScheduleGLineItemPost } from "../dynamics-post";
import { iExpenseReport } from "../expense-report.interface";
import { TransmogrifierExpenseReport } from "../transmogrifier-expense-report.class";

//userId: string, organizationId: string, expenseReportId: string, e: iExpenseReport
export function convertExpenseReportToDynamics(trans: TransmogrifierExpenseReport): iDynamicsPostScheduleG {
  // schedule g's
  const g: iDynamicsScheduleG = {};

  if (trans.expenseReport.administrationValue) g.vsd_programadministrationcurrentquarter = trans.expenseReport.administrationValue;
  // administration costs
  if (trans.expenseReport.administrationAnnualBudget) g.vsd_yeartodateprogramadministration = trans.expenseReport.administrationAnnualBudget;
  if (trans.expenseReport.administrationDescription) g.vsd_programadministrationexplanation = trans.expenseReport.administrationDescription;
  if (trans.expenseReport.administrationQuarterlyBudget) g.vsd_quarterlybudgetedprogramadministration = trans.expenseReport.administrationQuarterlyBudget;
  if (trans.expenseReport.administrationValue) g.vsd_programadministrationcurrentquarter = trans.expenseReport.administrationValue;

  // program delivery costs
  if (trans.expenseReport.programDeliveryAnnualBudget) g.vsd_yeartodateprogramdelivery = trans.expenseReport.programDeliveryAnnualBudget;
  if (trans.expenseReport.programDeliveryDescription) g.vsd_programdeliveryexplanations = trans.expenseReport.programDeliveryDescription;
  if (trans.expenseReport.programDeliveryQuarterlyBudget) g.vsd_quarterlybudgetedprogramdelivery = trans.expenseReport.programDeliveryQuarterlyBudget;
  if (trans.expenseReport.programDeliveryValue) g.vsd_programdeliverycurrentquarter = trans.expenseReport.programDeliveryValue;

  // salaries and benefits costs
  if (trans.expenseReport.salariesBenefitsAnnualBudget) g.vsd_yeartodatesalariesandbenefits = trans.expenseReport.salariesBenefitsAnnualBudget;
  if (trans.expenseReport.salariesBenefitsDescription) g.vsd_salariesandbenefitsexplanation = trans.expenseReport.salariesBenefitsDescription;
  if (trans.expenseReport.salariesBenefitsQuarterlyBudget) g.vsd_quarterlybudgetedsalariesbenefits = trans.expenseReport.salariesBenefitsQuarterlyBudget;
  if (trans.expenseReport.salariesBenefitsValue) g.vsd_salariesbenefitscurrentquarter = trans.expenseReport.salariesBenefitsValue;

  // contract service hours
  if (trans.expenseReport.serviceHoursQuarterlyActual) g.vsd_actualhoursthisquarter = trans.expenseReport.serviceHoursQuarterlyActual;
  // if (trans.expenseReport.serviceHours) g.vsd_contractedservicehrsthisquarter = trans.expenseReport.serviceHours;
  // if (trans.expenseReport.onCallStandByHours) g.vsd_contractedservicehrsthisquarter = trans.expenseReport.onCallStandByHours;
  if (trans.expenseReport.executiveReview) {
    g.vsd_reportreviewed = trans.expenseReport.executiveReview;
  }
  else {
    g.vsd_reportreviewed = false;
  }

  // save the identifier for this form
  if (trans.expenseReport.expenseReportId) g.vsd_schedulegid = trans.expenseReport.expenseReportId;

  //save if report has been reviewed
  // if (trans.expenseReport.executiveReview) g.vsd_reportreviewed = trans.expenseReport.executiveReview;

  // schedule g line items;
  const glis: iDynamicsScheduleGLineItemPost[] = [];
  for (let y of trans.expenseReport.programExpenseLineItems) {
    const lineItem: iDynamicsScheduleGLineItemPost = {
      vsd_scheduleglineitemid: y.itemId,
      vsd_actualexpensescurrentquarter: y.actual || 0,
    };
    glis.push(lineItem);
  }

  return {
    BusinessBCeID: trans.organizationId,
    UserBCeID: trans.userId,
    ScheduleGCollection: [g],
    ScheduleGLineItemCollection: glis,
  } as iDynamicsPostScheduleG;
}

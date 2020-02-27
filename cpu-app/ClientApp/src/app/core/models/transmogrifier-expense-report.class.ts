import { iDynamicsScheduleGResponse } from "./dynamics-blob";
import { ExpenseItemLabels } from "../constants/expense-item-labels";
import { iExpenseReport } from "./expense-report.interface";

// a collection of the expense item guids as K/V pairs for generating line items
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
      expenseReportId: g.ScheduleG.vsd_schedulegid || null,

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
      contractServiceHoursPerQuarter: g.ScheduleG.vsd_contractedservicehrsthisquarter || 0,
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


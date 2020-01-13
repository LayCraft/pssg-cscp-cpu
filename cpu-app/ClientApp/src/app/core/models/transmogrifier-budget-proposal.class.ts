import { iDynamicsBudgetProposal, iDynamicsCrmProgramRevenueSource, iDynamicsProgramExpense } from "./dynamics-blob";
import { iRevenueSource } from "./revenue-source.interface";
import { revenueSourceType } from "../constants/revenue-source-type";
import { iProgramBudget } from "./program-budget.interface";
import { iSalaryAndBenefits } from "./salary-and-benefits.interface";
import { iExpenseItem } from "./expense-item.interface";
import { uuidv4 } from "../constants/uuidv4";

export class TransmogrifierBudgetProposal {
  public organizationId: string;
  public userId: string;
  public programBudget: iProgramBudget;

  constructor(g: iDynamicsBudgetProposal) {
    this.userId = g.Userbceid;// this is the user's bceid
    this.organizationId = g.Businessbceid; // this is the organization's bceid
    this.programBudget = this.buildBudgetProposal(g);
  }
  private buildBudgetProposal(g: iDynamicsBudgetProposal): iProgramBudget {
    return {
      contractId: g.Contract.vsd_contractid || '',
      programId: g.Program.vsd_programid || '',
      name: g.Program.vsd_name || '',
      email: g.Program.vsd_emailaddress || '',
      revenueSources: this.buildRevenueSources(g),
      salariesAndBenefits: this.buildSalariesAndBenefits(g),
      programDeliveryCosts: this.buildProgramDeliveryCosts(g),
      programDeliveryMemberships: this.buildProgramDeliveryMemberships(g),
      programDeliveryOtherExpenses: this.buildProgramDeliveryOtherExpenses(g),
      administrationCosts: this.buildAdministrationCosts(g),
      administrationOtherExpenses: this.buildAdministrationOtherExpenses(g),
    };
  }
  private buildRevenueSources(g: iDynamicsBudgetProposal): iRevenueSource[] {
    const rs: iRevenueSource[] = [];
    // for each revenue source in the collection build it into something useful
    g.ProgramRevenueSourceCollection.forEach((prs: iDynamicsCrmProgramRevenueSource) => {
      rs.push({
        revenueSourceName: revenueSourceType(prs.vsd_cpu_revenuesourcetype) || '',
        cash: prs.vsd_cashcontribution || 0,
        inKindContribution: prs.vsd_inkindcontribution || 0,
        other: prs.vsd_cpu_otherrevenuesource || '',
      });
    })
    return rs;
  }
  private buildSalariesAndBenefits(g: iDynamicsBudgetProposal): iSalaryAndBenefits[] {
    return g.ProgramExpenseCollection
      // filter all non "salaries and benefits" items
      .filter((e: iDynamicsProgramExpense) => e.vsd_cpu_programexpensetype === 100000000)
      // data munging
      .map((e: iDynamicsProgramExpense): iSalaryAndBenefits => {
        return {
          title: e.vsd_cpu_titleposition || '',
          salary: e.vsd_cpu_salary || 0,
          benefits: e.vsd_cpu_benefits || 0,
          fundedFromVscp: e.vsd_cpu_fundedfromvscp || 0,
          totalCost: e.vsd_totalcost || 0,
          uuid: e.vsd_programexpenseid || uuidv4(),
        }
      });
  }
  private buildProgramDeliveryCosts(g: iDynamicsBudgetProposal): iExpenseItem[] {
    const dict = g.
    // collector for program expenses
    const c: iExpenseItem[] = [];
    g.ProgramExpenseCollection.forEach((pe: iDynamicsProgramExpense) => {
      c.push({
        uuid: pe.vsd_programexpenseid || uuidv4(),
        itemName: pe._vsd_eligibleexpenseitemid_value,
        fundedFromVscp: pe.vsd_cpu_fundedfromvscp || 0,
        cost: pe.vsd_totalcost,
        tooltip: null,
      });
    });
    return c;
  }
  private buildProgramDeliveryMemberships(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  private buildProgramDeliveryOtherExpenses(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  private buildAdministrationCosts(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
  private buildAdministrationOtherExpenses(g: iDynamicsBudgetProposal): iExpenseItem[] {
    return [];
  }
}
const fibble: iDynamicsBudgetProposal = {
  "@odata.context": "https://cscp-vs.dev.jag.gov.bc.ca/api/data/v9.0/$metadata#Microsoft.Dynamics.CRM.vsd_GetCPUBudgetProposalResponse",
  "IsSuccess": true,
  "Result": "CPU Budget Proposal found..",
  "Userbceid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  "Businessbceid": "fd889a40-14b2-e811-8163-480fcff4f621",
  "Contract": {
    "@odata.etag": "W/\"2112950\"",
    "vsd_contractid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "_vsd_customer_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "vsd_name": "15092013-20"
  },
  "Organization": {
    "@odata.etag": "W/\"2126814\"",
    "accountid": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "name": "Village of Burns Lake"
  },
  "Program": {
    "@odata.etag": "W/\"2199837\"",
    "vsd_cpu_percentoftotalprogramdeliveryfromvscp": 27.92,
    "vsd_cpu_totalrevenueamounts": 60000.0000000000,
    "vsd_cpu_totalcashcontributions": 50000.0000000000,
    "vsd_programid": "0e309304-c4e6-e911-b811-00505683fbf4",
    "vsd_cpu_totalsalariesandbenefitsfromvscp": 60000.0000000000,
    "_vsd_contactlookup_value": "4a9824c3-286c-e911-b80c-00505683fbf4",
    "vsd_cpu_percentoftotalsalarybenefitsvscp": 10.18,
    "statuscode": 100000006,
    "vsd_cpu_percentoftotaladmincostsfromvscp": 20.07,
    "vsd_emailaddress": "Burnslake@rcmp.com",
    "vsd_cpu_totalprogramdeliverycosts": 61050.0000000000,
    "vsd_name": "Burns Lake RCMP Victim/Witness Assistance Program",
    "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "vsd_cpu_totaladministrationcostsfromvscp": 20095.0000000000,
    "vsd_cpu_totalprogramdeliveryfromvscp": 17050.0000000000,
    "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
    "vsd_cpu_totalsalariesandbenefits": 589000.0000000000,
    "vsd_cpu_totaladministrationcosts": 100095.0000000000,
    "_vsd_programtype_value": "8a552ab9-09fc-e911-b812-00505683fbf4",
    "vsd_cpu_totalinkindcontributions": 10000.0000000000,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4"
  },
  "ProgramExpenseCollection": [{
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"1964013\"",
    "vsd_programexpenseid": "d49c50dd-2bf4-e911-b811-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000001,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_inputamount": 5000.0000,
    "_vsd_eligibleexpenseitemid_value": "53c1c560-2eba-e911-b80f-00505683fbf4",
    "vsd_cpu_fundedfromvscp": 6000.0000,
    "vsd_totalcost": 5000.00,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"2126709\"",
    "vsd_programexpenseid": "cb040f98-33fb-e911-b812-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000000,
    "vsd_cpu_salary": 550000.0000,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_cpu_titleposition": "Case Worker",
    "vsd_totalcost": 554000.00,
    "vsd_cpu_fundedfromvscp": 25000.0000,
    "vsd_cpu_benefits": 4000.0000,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"1974163\"",
    "vsd_programexpenseid": "938f4f6e-e90b-ea11-b813-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000001,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_inputamount": 50000.0000,
    "_vsd_eligibleexpenseitemid_value": "b4cd7aa0-2cba-e911-b80f-00505683fbf4",
    "vsd_cpu_fundedfromvscp": 5000.0000,
    "vsd_totalcost": 50000.00,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"1974198\"",
    "vsd_programexpenseid": "4a4039c9-8210-ea11-b814-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000002,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_inputamount": 100000.0000,
    "_vsd_eligibleexpenseitemid_value": "bd4abcc6-2dba-e911-b80f-00505683fbf4",
    "vsd_cpu_fundedfromvscp": 20000.0000,
    "vsd_totalcost": 100000.00,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"1973065\"",
    "vsd_programexpenseid": "309f8b5a-a310-ea11-b814-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000000,
    "vsd_cpu_salary": 32500.0000,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_cpu_titleposition": "Counsellor",
    "vsd_totalcost": 35000.00,
    "vsd_cpu_fundedfromvscp": 35000.0000,
    "vsd_cpu_benefits": 2500.0000,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"2126708\"",
    "vsd_programexpenseid": "fe579d39-d425-ea11-b814-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000001,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_inputamount": 6000.0000,
    "_vsd_eligibleexpenseitemid_value": "53c1c560-2eba-e911-b80f-00505683fbf4",
    "vsd_cpu_fundedfromvscp": 6000.0000,
    "vsd_totalcost": 6000.00,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"2199383\"",
    "vsd_programexpenseid": "dfa7c502-ca30-ea11-b814-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000001,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_inputamount": 50.0000,
    "_vsd_eligibleexpenseitemid_value": "a5fe2187-2dba-e911-b80f-00505683fbf4",
    "vsd_cpu_otherexpense": "Smaple Other Type",
    "vsd_cpu_fundedfromvscp": 50.0000,
    "vsd_totalcost": 50.00,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"2199386\"",
    "vsd_programexpenseid": "5bd5a112-ca30-ea11-b814-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000002,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_inputamount": 45.0000,
    "_vsd_eligibleexpenseitemid_value": "b87e6400-2eba-e911-b80f-00505683fbf4",
    "vsd_cpu_fundedfromvscp": 45.0000,
    "vsd_totalcost": 45.00,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programexpense",
    "@odata.etag": "W/\"2199389\"",
    "vsd_programexpenseid": "d429891e-ca30-ea11-b814-00505683fbf4",
    "vsd_cpu_programexpensetype": 100000002,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_inputamount": 50.0000,
    "_vsd_eligibleexpenseitemid_value": "7d48816d-2eba-e911-b80f-00505683fbf4",
    "vsd_cpu_otherexpense": "Sample Other Type 2",
    "vsd_cpu_fundedfromvscp": 50.0000,
    "vsd_totalcost": 50.00,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }],
  "ProgramRevenueSourceCollection": [{
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programrevenuesource",
    "@odata.etag": "W/\"2198435\"",
    "vsd_inkindcontribution": 5000.0000,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_cpu_revenuesourcetype": 100000000,
    "vsd_programrevenuesourceid": "af5e893e-2bf4-e911-b811-00505683fbf4",
    "vsd_cashcontribution": 25000.0000,
    "vsd_cpu_otherrevenuesource": "Mano field test",
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_programrevenuesource",
    "@odata.etag": "W/\"2126710\"",
    "vsd_inkindcontribution": 5000.0000,
    "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
    "vsd_cpu_revenuesourcetype": 100000000,
    "vsd_programrevenuesourceid": "00589d39-d425-ea11-b814-00505683fbf4",
    "vsd_cashcontribution": 25000.0000,
    "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
  }],
  "EligibleExpenseItemCollection": [{
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_eligibleexpenseitem",
    "@odata.etag": "W/\"2200525\"",
    "vsd_eligibleexpenseitemid": "b4cd7aa0-2cba-e911-b80f-00505683fbf4",
    "vsd_name": "Staff Training and Associated Travel",
    "vsd_programexpensetype": 100000001
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_eligibleexpenseitem",
    "@odata.etag": "W/\"2200517\"",
    "vsd_eligibleexpenseitemid": "a5fe2187-2dba-e911-b80f-00505683fbf4",
    "vsd_name": "Other Program Related Expenses",
    "vsd_programexpensetype": 100000001
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_eligibleexpenseitem",
    "@odata.etag": "W/\"2200532\"",
    "vsd_eligibleexpenseitemid": "bd4abcc6-2dba-e911-b80f-00505683fbf4",
    "vsd_name": "Management Salary/Benefits",
    "vsd_programexpensetype": 100000002
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_eligibleexpenseitem",
    "@odata.etag": "W/\"2200529\"",
    "vsd_eligibleexpenseitemid": "b87e6400-2eba-e911-b80f-00505683fbf4",
    "vsd_name": "Administration-Related Rent/Lease/Mortgage",
    "vsd_programexpensetype": 100000002
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_eligibleexpenseitem",
    "@odata.etag": "W/\"2200531\"",
    "vsd_eligibleexpenseitemid": "53c1c560-2eba-e911-b80f-00505683fbf4",
    "vsd_name": "Bookkeeping/Bank Fees",
    "vsd_programexpensetype": 100000002
  }, {
    "@odata.type": "#Microsoft.Dynamics.CRM.vsd_eligibleexpenseitem",
    "@odata.etag": "W/\"2200533\"",
    "vsd_eligibleexpenseitemid": "7d48816d-2eba-e911-b80f-00505683fbf4",
    "vsd_name": "Other Administration Costs",
    "vsd_programexpensetype": 100000002
  }]
}

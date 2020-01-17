import { Component, OnInit } from '@angular/core';
import { BudgetProposalService } from '../core/services/budget-proposal.service';
import { TransmogrifierBudgetProposal } from '../core/models/transmogrifier-budget-proposal.class';
import { iDynamicsBudgetProposalPost } from '../core/models/dynamics-post';
import { convertBudgetProposalToDynamics } from '../core/models/converters/budget-proposal-to-dynamics';
import { iDynamicsBudgetProposal } from '../core/models/dynamics-blob';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  data: iDynamicsBudgetProposalPost;
  trans: TransmogrifierBudgetProposal
  constructor(private budgetProposalService: BudgetProposalService) { }
  ngOnInit() {
    this.data = convertBudgetProposalToDynamics(new TransmogrifierBudgetProposal(this.foo));
  }
  foo = {
    "IsSuccess": true,
    "Result": "CPU Budget Proposal found..",
    "Userbceid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "Businessbceid": "fd889a40-14b2-e811-8163-480fcff4f621",
    "Contract": {
      "vsd_contractid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
      "_vsd_customer_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
      "vsd_name": "15092013-20"
    },
    "Organization": {
      "accountid": "ee3db438-1ea8-e911-b80e-00505683fbf4",
      "name": "Village of Burns Lake"
    },
    "ProgramCollection": [
      {
        "_vsd_contactlookup_value": "4a9824c3-286c-e911-b80c-00505683fbf4",
        "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
        "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
        "_vsd_programtype_value": "41d20ed4-19fc-e911-b812-00505683fbf4",
        "statuscode": 100000008,
        "vsd_emailaddress": "Burnslake@rcmp.com",
        "vsd_name": "CBVS - MAP VAN - Burns Lake Prov",
        "vsd_programid": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "_vsd_contactlookup_value": "4d028528-a3db-e911-b811-00505683fbf4",
        "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
        "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
        "_vsd_programtype_value": "b8ec7744-17fc-e911-b812-00505683fbf4",
        "statuscode": 100000008,
        "vsd_emailaddress": "burnslake@burnslake.ca",
        "vsd_name": "CBVS - All Crime - Burns Lake Prov",
        "vsd_programid": "1aae3dad-c4e6-e911-b811-00505683fbf4"
      }
    ],
    "SalaryAndBenefitCollection": [
      {
        "vsd_programexpenseid": "cb040f98-33fb-e911-b812-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000000,
        "vsd_cpu_salary": 550000.0,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_cpu_titleposition": "Case Worker",
        "vsd_inputamount": 0.0,
        "vsd_totalcost": 554000.0,
        "vsd_cpu_fundedfromvscp": 25000.0,
        "vsd_cpu_benefits": 4000.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "vsd_programexpenseid": "309f8b5a-a310-ea11-b814-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000000,
        "vsd_cpu_salary": 32500.0,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_cpu_titleposition": "Counsellor",
        "vsd_totalcost": 35000.0,
        "vsd_cpu_fundedfromvscp": 35000.0,
        "vsd_cpu_benefits": 2500.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      }
    ],
    "ProgramDeliveryCostCollection": [
      {
        "vsd_programexpenseid": "d49c50dd-2bf4-e911-b811-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000001,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_inputamount": 5000.0,
        "_vsd_eligibleexpenseitemid_value": "53c1c560-2eba-e911-b80f-00505683fbf4",
        "vsd_cpu_fundedfromvscp": 6000.0,
        "vsd_totalcost": 5000.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "vsd_programexpenseid": "938f4f6e-e90b-ea11-b813-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000001,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_inputamount": 50000.0,
        "_vsd_eligibleexpenseitemid_value": "b4cd7aa0-2cba-e911-b80f-00505683fbf4",
        "vsd_cpu_fundedfromvscp": 5000.0,
        "vsd_totalcost": 50000.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "vsd_programexpenseid": "fe579d39-d425-ea11-b814-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000001,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_inputamount": 6000.0,
        "_vsd_eligibleexpenseitemid_value": "53c1c560-2eba-e911-b80f-00505683fbf4",
        "vsd_cpu_fundedfromvscp": 6000.0,
        "vsd_totalcost": 6000.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "vsd_programexpenseid": "dfa7c502-ca30-ea11-b814-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000001,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_inputamount": 50.0,
        "_vsd_eligibleexpenseitemid_value": "a5fe2187-2dba-e911-b80f-00505683fbf4",
        "vsd_cpu_otherexpense": "Smaple Other Type",
        "vsd_cpu_fundedfromvscp": 50.0,
        "vsd_totalcost": 50.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "vsd_programexpenseid": "67b96f9a-b438-ea11-b814-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000001,
        "vsd_cpu_salary": 0.0,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_inputamount": 6000.0,
        "vsd_totalcost": 6000.0,
        "_vsd_eligibleexpenseitemid_value": "53c1c560-2eba-e911-b80f-00505683fbf4",
        "vsd_cpu_fundedfromvscp": 6000.0,
        "vsd_cpu_benefits": 0.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      }
    ],
    "AdministrationCostCollection": [
      {
        "vsd_programexpenseid": "5bd5a112-ca30-ea11-b814-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000002,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_inputamount": 45.0,
        "_vsd_eligibleexpenseitemid_value": "b87e6400-2eba-e911-b80f-00505683fbf4",
        "vsd_cpu_fundedfromvscp": 45.0,
        "vsd_totalcost": 45.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "vsd_programexpenseid": "d429891e-ca30-ea11-b814-00505683fbf4",
        "vsd_cpu_programexpensetype": 100000002,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_inputamount": 50.0,
        "_vsd_eligibleexpenseitemid_value": "7d48816d-2eba-e911-b80f-00505683fbf4",
        "vsd_cpu_otherexpense": "Sample Other Type 2",
        "vsd_cpu_fundedfromvscp": 50.0,
        "vsd_totalcost": 50.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      }
    ],
    "ProgramRevenueSourceCollection": [
      {
        "vsd_inkindcontribution": 5000.0,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_cpu_revenuesourcetype": 100000000,
        "vsd_programrevenuesourceid": "af5e893e-2bf4-e911-b811-00505683fbf4",
        "vsd_cashcontribution": 25000.0,
        "vsd_cpu_otherrevenuesource": "Mano field test",
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "vsd_inkindcontribution": 5000.0,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_cpu_revenuesourcetype": 100000000,
        "vsd_programrevenuesourceid": "00589d39-d425-ea11-b814-00505683fbf4",
        "vsd_cashcontribution": 25000.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      },
      {
        "vsd_inkindcontribution": 5000.0,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_cpu_revenuesourcetype": 100000000,
        "vsd_programrevenuesourceid": "69b96f9a-b438-ea11-b814-00505683fbf4",
        "vsd_cashcontribution": 25000.0,
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4"
      }
    ],
    "EligibleExpenseItemCollection": [
      {
        "vsd_eligibleexpenseitemid": "b4cd7aa0-2cba-e911-b80f-00505683fbf4",
        "vsd_name": "Staff Training and Associated Travel",
        "vsd_programexpensetype": 100000001
      },
      {
        "vsd_eligibleexpenseitemid": "a5fe2187-2dba-e911-b80f-00505683fbf4",
        "vsd_name": "Other Program Related Expenses",
        "vsd_programexpensetype": 100000001
      },
      {
        "vsd_eligibleexpenseitemid": "b87e6400-2eba-e911-b80f-00505683fbf4",
        "vsd_name": "Administration-Related Rent/Lease/Mortgage",
        "vsd_programexpensetype": 100000002
      },
      {
        "vsd_eligibleexpenseitemid": "53c1c560-2eba-e911-b80f-00505683fbf4",
        "vsd_name": "Bookkeeping/Bank Fees",
        "vsd_programexpensetype": 100000002
      },
      {
        "vsd_eligibleexpenseitemid": "7d48816d-2eba-e911-b80f-00505683fbf4",
        "vsd_name": "Other Administration Costs",
        "vsd_programexpensetype": 100000002
      }
    ],
    "ProgramTypeCollection": [
      {
        "vsd_programtypeid": "41d20ed4-19fc-e911-b812-00505683fbf4",
        "vsd_name": "CBVS - MAP VAN"
      },
      {
        "vsd_programtypeid": "b8ec7744-17fc-e911-b812-00505683fbf4",
        "vsd_name": "CBVS - All Crime"
      }
    ]
  } as iDynamicsBudgetProposal
}

import { Component, OnInit } from '@angular/core';
import { iDynamicsScheduleGResponse } from '../core/models/dynamics-schedule-g-response';
import { TransmogrifierExpenseReport } from '../core/models/transmogrifier-expense-report.class';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // store the results
  input: iDynamicsScheduleGResponse = {
    "@odata.context": "https://cscp-vs.dev.jag.gov.bc.ca/api/data/v9.0/$metadata#Microsoft.Dynamics.CRM.vsd_GetCPUScheduleGResponse",
    "IsSuccess": true,
    "Result": "CPU Organization found..",
    "Userbceid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "Businessbceid": "fd889a40-14b2-e811-8163-480fcff4f621",
    "ScheduleGs": [
      {
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "vsd_salaryandbenefitsbudgeted": 60000.0000,
        "vsd_schedulegid": "e480dbe7-a910-ea11-b810-005056830319",
        "vsd_yeartodatesalariesandbenefits": 1000.0000,
        "vsd_programdeliverybudgeted": 11000.0000,
        "vsd_reportreviewed": false,
        "vsd_quarterlybudgetedprogramdelivery": 2750.00,
        "vsd_yeartodateprogramadministration": 800.0000,
        "vsd_quarterlybudgetedsalariesbenefits": 15000.00,
        "vsd_cpu_reportingperiod": 100000002,
        "vsd_yeartodatevarianceprogramadministration": 19200.00,
        "vsd_quarterlybudgetedprogramadministration": 5000.00,
        "vsd_programadministrationbudgeted": 20000.0000,
        "vsd_yeartodatevarianceprogramdelivery": 10800.00,
        "_vsd_contract_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
        "vsd_yeartodatevariancesalariesbenefits": 59000.0000,
        "vsd_yeartodateprogramdelivery": 200.0000,
        "_vsd_program_value": "0e309304-c4e6-e911-b811-00505683fbf4",
        "_vsd_serviceprovider_value": "ee3db438-1ea8-e911-b80e-00505683fbf4"
      }
    ],
    "ScheduleGLineItems": [{
      "@odata.type": "#Microsoft.Dynamics.CRM.vsd_scheduleglineitem",
      "@odata.etag": "W/\"1974719\"",
      "_vsd_schedulegid_value": "e480dbe7-a910-ea11-b810-005056830319",
      "_vsd_expenselineitem_value": "f7e71080-2cba-e911-b80f-00505683fbf4",
      "vsd_scheduleglineitemid": "e580dbe7-a910-ea11-b810-005056830319"
    }, {
      "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
      "_vsd_expenselineitem_value": "b4cd7aa0-2cba-e911-b80f-00505683fbf4",
      "_vsd_schedulegid_value": "e480dbe7-a910-ea11-b810-005056830319",
      "vsd_annualbudgetedamount": 5000.0000,
      "vsd_scheduleglineitemid": "e680dbe7-a910-ea11-b810-005056830319",
      "vsd_quarterlybudgetedamount": 1250.00
    }, {
      "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
      "_vsd_expenselineitem_value": "bd4abcc6-2dba-e911-b80f-00505683fbf4",
      "_vsd_schedulegid_value": "e480dbe7-a910-ea11-b810-005056830319",
      "vsd_annualbudgetedamount": 20000.0000,
      "vsd_scheduleglineitemid": "e780dbe7-a910-ea11-b810-005056830319",
      "vsd_quarterlybudgetedamount": 5000.00
    }]
  } as iDynamicsScheduleGResponse;
  output: TransmogrifierExpenseReport;

  constructor(
  ) { }
  ngOnInit() {
    this.output = new TransmogrifierExpenseReport(this.input);
  }
}

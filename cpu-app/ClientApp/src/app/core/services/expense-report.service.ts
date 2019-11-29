import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { iDynamicsScheduleGResponse } from '../models/dynamics-schedule-g-response';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService {
  // this should query the test api
  apiUrl = 'api/DynamicsScheduleG';

  response = {
    "fortunecookiecontext": "https://cscp-vs.dev.jag.gov.bc.ca/api/data/v9.0/$metadata#Microsoft.Dynamics.CRM.vsd_GetCPUScheduleGResponse",
    "IsSuccess": true,
    "Result": "CPU Schedule G found..",
    "ScheduleG": {
      "fortunecookietype": "#Microsoft.Dynamics.CRM.vsd_scheduleg",
      "fortunecookieetag": "W/\"1994648\"",
      "vsd_salariesbenefitscurrentquarter": 1200.34,
      "vsd_programdeliverycurrentquarter": 1000.32,
      "vsd_yeartodateprogramdelivery": 200.0,
      "vsd_quarterlyvarianceprogramadministration": 4899.5,
      "vsd_salariesandbenefitsexplanation": "this is a text value..",
      "vsd_reportreviewed": false,
      "vsd_programdeliverybudgeted": 11000.0,
      "vsd_quarterlyvarianceprogramdelivery": 1749.68,
      "vsd_quarterlybudgetedprogramdelivery": 2750.0,
      "vsd_yeartodatevariancesalariesbenefits": 59000.0,
      "vsd_schedulegid": "e480dbe7-a910-ea11-b810-005056830319",
      "_vsd_serviceprovider_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
      "vsd_yeartodatevarianceprogramdelivery": 10800.0,
      "vsd_programadministrationcurrentquarter": 100.5,
      "vsd_programdeliveryexplanations": "this is a text value..",
      "vsd_yeartodatesalariesandbenefits": 1000.0,
      "vsd_programadministrationbudgeted": 20000.0,
      "vsd_quarterlybudgetedprogramadministration": 5000.0,
      "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
      "_vsd_contact_value": "93341b5c-84d8-e811-815f-480fcff4f6a1",
      "vsd_submitteddate": "2019-11-27T18:00:00Z",
      "vsd_cpu_reportingperiod": 100000002,
      "_vsd_contract_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
      "vsd_salaryandbenefitsbudgeted": 60000.0,
      "vsd_yeartodatevarianceprogramadministration": 19200.0,
      "vsd_quarterlyvariancesalariesbenefits": 13799.66,
      "_vsd_program_value": "0e309304-c4e6-e911-b811-00505683fbf4",
      "vsd_yeartodateprogramadministration": 800.0,
      "vsd_quarterlybudgetedsalariesbenefits": 15000.0,
      "vsd_programadministrationexplanation": "this is a text value.."
    },
    "ScheduleGLineItems": [
      {
        "fortunecookietype": "#Microsoft.Dynamics.CRM.vsd_scheduleglineitem",
        "fortunecookieetag": "W/\"1994735\"",
        "vsd_actualexpendituresyeartodate": 1500.0,
        "vsd_yeartodatevariance": 500.0,
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "_vsd_expenselineitem_value": "f7e71080-2cba-e911-b80f-00505683fbf4",
        "_vsd_schedulegid_value": "e480dbe7-a910-ea11-b810-005056830319",
        "vsd_annualbudgetedamount": 2000.0,
        "vsd_scheduleglineitemid": "e580dbe7-a910-ea11-b810-005056830319",
        "vsd_quarterlyvariance": 799.66,
        "vsd_actualexpensescurrentquarter": 1200.34,
        "vsd_quarterlybudgetedamount": 500.0
      },
      {
        "fortunecookietype": "#Microsoft.Dynamics.CRM.vsd_scheduleglineitem",
        "fortunecookieetag": "W/\"1990654\"",
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "_vsd_expenselineitem_value": "b4cd7aa0-2cba-e911-b80f-00505683fbf4",
        "_vsd_schedulegid_value": "e480dbe7-a910-ea11-b810-005056830319",
        "vsd_annualbudgetedamount": 5000.0,
        "vsd_scheduleglineitemid": "e680dbe7-a910-ea11-b810-005056830319",
        "vsd_quarterlybudgetedamount": 1250.0
      },
      {
        "fortunecookietype": "#Microsoft.Dynamics.CRM.vsd_scheduleglineitem",
        "fortunecookieetag": "W/\"1990655\"",
        "_transactioncurrencyid_value": "332fffff-f04b-e911-b80c-00505683fbf4",
        "_vsd_expenselineitem_value": "bd4abcc6-2dba-e911-b80f-00505683fbf4",
        "_vsd_schedulegid_value": "e480dbe7-a910-ea11-b810-005056830319",
        "vsd_annualbudgetedamount": 20000.0,
        "vsd_scheduleglineitemid": "e780dbe7-a910-ea11-b810-005056830319",
        "vsd_quarterlybudgetedamount": 5000.0
      }
    ]
  };

  constructor(
    private http: HttpClient,
  ) { }

  getScheduleG(scheduleGId: string): Observable<iDynamicsScheduleGResponse> {
    // return this.http.get<iDynamicsScheduleGResponse>(`${this.apiUrl}/${scheduleGId}`, { headers: this.headers }).pipe(
    //   retry(3),
    //   catchError(this.handleError)
    // );
    return of(this.response);
  }
  get headers(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  protected handleError(err): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}

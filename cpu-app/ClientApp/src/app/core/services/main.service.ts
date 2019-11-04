import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { iDynamicsBlob } from '../models/transmogrifier.class';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // this should query the test api
  apiUrl = 'api/justice/test';

  constructor(
    private http: HttpClient
  ) { }

  getBlob(): Observable<iDynamicsBlob> {
    return this.http.get<iDynamicsBlob>(this.apiUrl, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
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
  // THIS MOCK RESPONSE IS SOMETHING RETURNED FROM DYNAMICS
  // {
  //   "@odata.context": "https://cscp-vs.dev.jag.gov.bc.ca/api/data/v9.0/$metadata#Microsoft.Dynamics.CRM.vsd_GetCPUOrgContractsResponse",
  //   "IsSuccess": true,
  //   "Result": "CPU Organization found..",
  //   "bceid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  //   "Organization": {
  //     "@odata.etag": "W/\"1651298\"",
  //     "telephone1": "250-692-7587",
  //     "address1_city": "Burns Lake",
  //     "address2_city": "Burns Lake",
  //     "address2_line2": "2: P.O. Box 570",
  //     "address2_line1": "2: 15 3rd Ave",
  //     "address2_stateorprovince": "British Columbia",
  //     "address2_postalcode": "V0J 1E1",
  //     "address1_postalcode": "V0J 1E0",
  //     "address1_stateorprovince": "British Columbia",
  //     "accountid": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //     "_vsd_boardcontactid_value": "1ca6ef43-84d8-e811-815f-480fcff4f6a1",
  //     "_ownerid_value": "42bde0b4-6e5e-e911-b80c-00505683fbf4",
  //     "fax": "250-546-2922",
  //     "emailaddress1": "village@burnslake.ca",
  //     "_vsd_executivecontactid_value": "93341b5c-84d8-e811-815f-480fcff4f6a1",
  //     "name": "Village of Burns Lake",
  //     "address1_line1": "#15 3rd Ave",
  //     "address1_line2": "P.O. Box 570",
  //     "address1_composite": "#15 3rd Ave\r\nP.O. Box 570\r\nBurns Lake, British Columbia V0J 1E0",
  //     "address2_composite": "2: 15 3rd Ave\r\n2: P.O. Box 570\r\nBurns Lake, British Columbia V0J 1E1"
  //   },
  //   "Staff": [
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.contact",
  //       "@odata.etag": "W/\"1615282\"",
  //       "firstname": "Adam",
  //       "address1_city": "Alberta Beach",
  //       "address1_line1": "34564rwedsfgdsf st",
  //       "vsd_bceid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  //       "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "address1_stateorprovince": "Arizona",
  //       "address1_postalcode": "234532",
  //       "fullname": "Adam Rodger",
  //       "emailaddress1": "a.roger@gmail.com",
  //       "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
  //       "lastname": "Rodger",
  //       "address1_composite": "34564rwedsfgdsf st\r\nAlberta Beach, Arizona 234532"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.contact",
  //       "@odata.etag": "W/\"1661577\"",
  //       "address1_line1": "#15 3rd Ave",
  //       "address1_city": "Burns Lake",
  //       "middlename": "Joe",
  //       "address1_postalcode": "V0J 1E1",
  //       "address1_stateorprovince": "British Columbia",
  //       "jobtitle": "Program Manager",
  //       "contactid": "4d028528-a3db-e911-b811-00505683fbf4",
  //       "firstname": "Bradley",
  //       "fullname": "Bradley Joe Green",
  //       "mobilephone": "2503442234",
  //       "lastname": "Green",
  //       "fax": "250-363-394",
  //       "emailaddress1": "Bradley.Green@email.com",
  //       "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "address1_line2": "P.O. Box 570",
  //       "address1_composite": "#15 3rd Ave\r\nP.O. Box 570\r\nBurns Lake, British Columbia V0J 1E1"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.contact",
  //       "@odata.etag": "W/\"1215468\"",
  //       "firstname": "Owen",
  //       "address1_city": "Vancouver",
  //       "address1_line1": "6739 West 49th Street",
  //       "emailaddress1": "wade.mostert@quartech.com",
  //       "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "address1_stateorprovince": "British Columbia",
  //       "mobilephone": "6049103729",
  //       "middlename": "James",
  //       "jobtitle": "Community Services Manager",
  //       "address1_postalcode": "V3N 8U9",
  //       "fullname": "Owen James Taylor",
  //       "contactid": "1ca6ef43-84d8-e811-815f-480fcff4f6a1",
  //       "lastname": "Taylor",
  //       "address1_composite": "6739 West 49th Street\r\nVancouver, British Columbia V3N 8U9"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.contact",
  //       "@odata.etag": "W/\"1692136\"",
  //       "firstname": "Aaron",
  //       "address1_city": "Alberta Beach",
  //       "address1_line1": "dtyuhkjrteye",
  //       "emailaddress1": "Aaron.Glover@email.com",
  //       "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "address1_stateorprovince": "Alabama",
  //       "middlename": "A",
  //       "address1_postalcode": "345rty687",
  //       "fullname": "Aaron Glover",
  //       "contactid": "8c1b1256-84d8-e811-815f-480fcff4f6a1",
  //       "lastname": "Glover",
  //       "address1_composite": "dtyuhkjrteye\r\nAlberta Beach, Alabama 345rty687"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.contact",
  //       "@odata.etag": "W/\"1610573\"",
  //       "address1_line1": "Lakeview Mall",
  //       "address1_city": "Burns Lake",
  //       "middlename": "N",
  //       "address1_postalcode": "V0J 1E0",
  //       "address1_stateorprovince": "British Columbia",
  //       "jobtitle": "Board Contact",
  //       "contactid": "93341b5c-84d8-e811-815f-480fcff4f6a1",
  //       "firstname": "Bradley",
  //       "fullname": "Bradley Lopez",
  //       "mobilephone": "6048392202",
  //       "lastname": "Lopez",
  //       "fax": "250-274-3894",
  //       "emailaddress1": "Bradley.Lopez@email.com",
  //       "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "address1_line2": "Street Address 2 Test",
  //       "address1_composite": "Lakeview Mall\r\nStreet Address 2 Test\r\nBurns Lake, British Columbia V0J 1E0"
  //     }
  //   ],
  //   "ExecutiveContact": {
  //     "@odata.etag": "W/\"1610573\"",
  //     "address1_line1": "Lakeview Mall",
  //     "address1_city": "Burns Lake",
  //     "middlename": "N",
  //     "address1_postalcode": "V0J 1E0",
  //     "address1_stateorprovince": "British Columbia",
  //     "jobtitle": "Board Contact",
  //     "contactid": "93341b5c-84d8-e811-815f-480fcff4f6a1",
  //     "firstname": "Bradley",
  //     "fullname": "Bradley Lopez",
  //     "mobilephone": "6048392202",
  //     "lastname": "Lopez",
  //     "fax": "250-274-3894",
  //     "emailaddress1": "Bradley.Lopez@email.com",
  //     "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //     "address1_line2": "Street Address 2 Test",
  //     "address1_composite": "Lakeview Mall\r\nStreet Address 2 Test\r\nBurns Lake, British Columbia V0J 1E0"
  //   },
  //   "BoardContact": {
  //     "@odata.etag": "W/\"1215468\"",
  //     "address1_line1": "6739 West 49th Street",
  //     "address1_city": "Vancouver",
  //     "middlename": "James",
  //     "address1_postalcode": "V3N 8U9",
  //     "address1_stateorprovince": "British Columbia",
  //     "contactid": "1ca6ef43-84d8-e811-815f-480fcff4f6a1",
  //     "firstname": "Owen",
  //     "fullname": "Owen James Taylor",
  //     "mobilephone": "6049103729",
  //     "lastname": "Taylor",
  //     "jobtitle": "Community Services Manager",
  //     "emailaddress1": "wade.mostert@quartech.com",
  //     "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //     "address1_composite": "6739 West 49th Street\r\nVancouver, British Columbia V3N 8U9"
  //   },
  //   "MinistryUser": {
  //     "@odata.etag": "W/\"692998\"",
  //     "fullname": "CPU Service Account",
  //     "systemuserid": "42bde0b4-6e5e-e911-b80c-00505683fbf4",
  //     "ownerid": "42bde0b4-6e5e-e911-b80c-00505683fbf4"
  //   },
  //   "Contracts": [
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_contract",
  //       "@odata.etag": "W/\"1210170\"",
  //       "vsd_contractid": "5dc64c07-a3a8-e911-b80e-00505683fbf4",
  //       "_vsd_customer_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "statuscode": 1,
  //       "vsd_name": "15092013-21",
  //       "_vsd_contactlookup2_value": "4a9824c3-286c-e911-b80c-00505683fbf4",
  //       "_vsd_contactlookup1_value": "1ca6ef43-84d8-e811-815f-480fcff4f6a1"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_contract",
  //       "@odata.etag": "W/\"1611082\"",
  //       "vsd_contractid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  //       "_vsd_customer_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "statuscode": 100000006,
  //       "vsd_name": "15092013-20",
  //       "_vsd_contactlookup2_value": "4a9824c3-286c-e911-b80c-00505683fbf4",
  //       "_vsd_contactlookup1_value": "1ca6ef43-84d8-e811-815f-480fcff4f6a1"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_contract",
  //       "@odata.etag": "W/\"1610631\"",
  //       "vsd_contractid": "07c7c000-1ee6-e911-b811-00505683fbf4",
  //       "_vsd_customer_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "statuscode": 2,
  //       "vsd_name": "15092013-19",
  //       "_vsd_contactlookup2_value": "4a9824c3-286c-e911-b80c-00505683fbf4",
  //       "_vsd_contactlookup1_value": "1ca6ef43-84d8-e811-815f-480fcff4f6a1"
  //     }
  //   ],
  //   "Programs": [
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_program",
  //       "@odata.etag": "W/\"1611502\"",
  //       "vsd_programid": "571a468e-a2a8-e911-b80e-00505683fbf4",
  //       "vsd_postalcodezip": "V0J 1E0",
  //       "_vsd_contactlookup_value": "93341b5c-84d8-e811-815f-480fcff4f6a1",
  //       "vsd_mailingpostalcodezip": "V0J 1E2",
  //       "vsd_mailingcity": "Beaver County",
  //       "vsd_phonenumber": "2507843832",
  //       "vsd_emailaddress": "burnslake@rcmp.com",
  //       "vsd_fax": "2508372345",
  //       "vsd_mailingaddressline2": "2:PO Box 759",
  //       "vsd_name": "Burns Lake RCMP Victim/Witness Assistance Program",
  //       "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "vsd_mailingprovincestate": "British Columbia",
  //       "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "vsd_provincestate": "British Columbia",
  //       "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "_vsd_contractid_value": "5dc64c07-a3a8-e911-b80e-00505683fbf4",
  //       "vsd_mailingaddressline1": "2:147 Highway 35",
  //       "vsd_city": "Beaver County",
  //       "vsd_addressline1": "147 Highway 35",
  //       "vsd_addressline2": "PO Box 759"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_program",
  //       "@odata.etag": "W/\"1612483\"",
  //       "vsd_programid": "3e2ebd7f-4fc8-e911-b80f-00505683fbf4",
  //       "vsd_postalcodezip": "V0J 1E0",
  //       "_vsd_contactlookup_value": "4d028528-a3db-e911-b811-00505683fbf4",
  //       "vsd_mailingpostalcodezip": "V0J 1E0",
  //       "vsd_mailingcity": "Beaver County",
  //       "vsd_phonenumber": "250-283-2438",
  //       "vsd_emailaddress": "communityprogram1@burnslake.ca",
  //       "vsd_fax": "250-384-3443",
  //       "vsd_mailingaddressline2": "Test Line 2 Street",
  //       "vsd_name": "Community Program 1",
  //       "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "vsd_mailingprovincestate": "Arizona",
  //       "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "vsd_provincestate": "British Columbia",
  //       "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "_vsd_contractid_value": "5dc64c07-a3a8-e911-b80e-00505683fbf4",
  //       "vsd_mailingaddressline1": "508 Yellowhead Highway",
  //       "vsd_city": "Beaver County",
  //       "vsd_addressline1": "508 Yellowhead Highway",
  //       "vsd_addressline2": "Line 2 Address"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_program",
  //       "@odata.etag": "W/\"1611524\"",
  //       "vsd_programid": "b1bf629b-93e4-e911-b811-00505683fbf4",
  //       "vsd_postalcodezip": "V8Y 5A5",
  //       "_vsd_contactlookup_value": "4d028528-a3db-e911-b811-00505683fbf4",
  //       "vsd_mailingpostalcodezip": "Y8N 4A5",
  //       "vsd_mailingcity": "Athabasca County",
  //       "vsd_phonenumber": "6522623645",
  //       "vsd_emailaddress": "communityprogram1@burnslake.ca",
  //       "vsd_fax": "6093826243",
  //       "vsd_mailingaddressline2": "Address Line 2 Test",
  //       "vsd_name": "Community Program 1 Past",
  //       "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "vsd_mailingprovincestate": "British Columbia",
  //       "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "vsd_provincestate": "British Columbia",
  //       "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "_vsd_contractid_value": "07c7c000-1ee6-e911-b811-00505683fbf4",
  //       "vsd_mailingaddressline1": "64783 South Street",
  //       "vsd_city": "City of Spruce Grove",
  //       "vsd_addressline1": "4566 West Street",
  //       "vsd_addressline2": "Line 2 Test"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_program",
  //       "@odata.etag": "W/\"1611538\"",
  //       "vsd_programid": "78d20b50-1fe6-e911-b811-00505683fbf4",
  //       "vsd_postalcodezip": "V0J 1E0",
  //       "_vsd_contactlookup_value": "93341b5c-84d8-e811-815f-480fcff4f6a1",
  //       "vsd_mailingpostalcodezip": "V0J 1E2",
  //       "vsd_mailingcity": "Birch Hills County",
  //       "vsd_phonenumber": "2508762345",
  //       "vsd_emailaddress": "burnslake@rcmp.com",
  //       "vsd_fax": "2508972341",
  //       "vsd_mailingaddressline2": "2:PO Box 759",
  //       "vsd_name": "Burns Lake RCMP Victim/Witness Assistance Program",
  //       "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "vsd_mailingprovincestate": "British Columbia",
  //       "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "vsd_provincestate": "British Columbia",
  //       "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "_vsd_contractid_value": "07c7c000-1ee6-e911-b811-00505683fbf4",
  //       "vsd_mailingaddressline1": "2:147 Highway 35",
  //       "vsd_city": "Brazeau County",
  //       "vsd_addressline1": "147 Highway 35",
  //       "vsd_addressline2": "PO Box 759"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_program",
  //       "@odata.etag": "W/\"1707173\"",
  //       "vsd_programid": "0e309304-c4e6-e911-b811-00505683fbf4",
  //       "vsd_postalcodezip": "V0J 1E0",
  //       "_vsd_contactlookup_value": "93341b5c-84d8-e811-815f-480fcff4f6a1",
  //       "vsd_mailingpostalcodezip": "V0J 1E2",
  //       "vsd_mailingcity": "Beaver County",
  //       "vsd_phonenumber": "2509483343",
  //       "vsd_emailaddress": "Burnslake@rcmp.com",
  //       "vsd_fax": "2508763452",
  //       "vsd_mailingaddressline2": "2:PO Box 759",
  //       "vsd_name": "Burns Lake RCMP Victim/Witness Assistance Program",
  //       "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "vsd_mailingprovincestate": "British Columbia",
  //       "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "vsd_provincestate": "British Columbia",
  //       "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  //       "vsd_mailingaddressline1": "2:147 Highway 35",
  //       "vsd_city": "Athabasca County",
  //       "vsd_addressline1": "147 Highway 35",
  //       "vsd_addressline2": "PO Box 759"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.vsd_program",
  //       "@odata.etag": "W/\"1611488\"",
  //       "vsd_programid": "1aae3dad-c4e6-e911-b811-00505683fbf4",
  //       "vsd_postalcodezip": "V8Y 5A5",
  //       "_vsd_contactlookup_value": "4d028528-a3db-e911-b811-00505683fbf4",
  //       "vsd_mailingpostalcodezip": "Y8N 4A5",
  //       "vsd_mailingcity": "Athabasca County",
  //       "vsd_phonenumber": "6048393333",
  //       "vsd_emailaddress": "burnslake@burnslake.ca",
  //       "vsd_fax": "3433334444",
  //       "vsd_mailingaddressline2": "Address Line 2 Test",
  //       "vsd_name": "Community Program 1 Past",
  //       "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "vsd_mailingprovincestate": "British Columbia",
  //       "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
  //       "vsd_provincestate": "British Columbia",
  //       "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
  //       "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  //       "vsd_mailingaddressline1": "64783 South Street",
  //       "vsd_city": "Beaver County",
  //       "vsd_addressline1": "4566 West Street",
  //       "vsd_addressline2": "Line 2 Test"
  //     }
  //   ],
  //   "Tasks": [
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.task",
  //       "@odata.etag": "W/\"1712164\"",
  //       "statecode": 0,
  //       "description": "TETS ETST ETSTETSTETSTETSTETS",
  //       "activityid": "716395ff-f1f4-e911-b811-00505683fbf4",
  //       "scheduledend": "2020-03-04T08:00:00Z",
  //       "_regardingobjectid_value": "5dc64c07-a3a8-e911-b80e-00505683fbf4",
  //       "statuscode": 2,
  //       "subject": "Contract Renewal Application"
  //     },
  //     {
  //       "@odata.type": "#Microsoft.Dynamics.CRM.task",
  //       "@odata.etag": "W/\"1712169\"",
  //       "statecode": 0,
  //       "description": "Complete Schedule G for first quarter",
  //       "activityid": "43a7b61e-f2f4-e911-b811-00505683fbf4",
  //       "scheduledend": "2020-06-01T07:00:00Z",
  //       "_regardingobjectid_value": "5dc64c07-a3a8-e911-b80e-00505683fbf4",
  //       "statuscode": 2,
  //       "subject": "Schedule G completed"
  //     }
  //   ]
  // }

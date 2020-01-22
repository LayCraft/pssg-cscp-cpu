import { Component, OnInit } from '@angular/core';
import { BudgetProposalService } from '../core/services/budget-proposal.service';
import { TransmogrifierBudgetProposal } from '../core/models/transmogrifier-budget-proposal.class';
import { iDynamicsScheduleFResponse, iDynamicsScheduleFPost } from '../core/models/dynamics-blob';
import { TransmogrifierProgramApplication } from '../core/models/transmogrifier-program-application.class';
import { convertProgramApplicationToDynamics } from '../core/models/converters/program-application-to-dynamics';
import * as moment from 'moment';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tween: TransmogrifierProgramApplication;
  out: iDynamicsScheduleFPost;
  constructor() { }
  ngOnInit() {
    this.tween = new TransmogrifierProgramApplication(this.foo);
    this.out = convertProgramApplicationToDynamics(this.tween);
  }

  foo: iDynamicsScheduleFResponse = {
    "IsSuccess": true,
    "Result": "CPU Schedule F found..",
    "Userbceid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "Businessbceid": "fd889a40-14b2-e811-8163-480fcff4f621",
    "Contract": {
      "vsd_contractid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
      "_vsd_customer_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
      "vsd_cpu_specificunion": "this is a text value..",
      "vsd_name": "15092013-20",
      "_vsd_contactlookup2_value": "4a9824c3-286c-e911-b80c-00505683fbf4",
      "_vsd_contactlookup1_value": "4a9824c3-286c-e911-b80c-00505683fbf4"
    },
    "Organization": {
      "telephone1": "604-233-3433",
      "address1_city": "Burns Lake",
      "address2_city": "Burns Lake",
      "address2_line2": "P.O. Box 570",
      "address2_line1": "15 3rd Ave",
      "address2_stateorprovince": "British Columbia",
      "address2_postalcode": "V0J 1E1",
      "address1_postalcode": "V0J 1E0",
      "address1_stateorprovince": "British Columbia",
      "accountid": "ee3db438-1ea8-e911-b80e-00505683fbf4",
      "fax": "250-546-2922",
      "emailaddress1": "123@com.com",
      "address2_country": "Canada",
      "address1_country": "Canada",
      "name": "Village of Burns Lake",
      "address1_line1": "#15 3rd",
      "address1_line2": "P.O. Box 570"
    },
    "ExecutiveContact": {
      "firstname": "Adam",
      "address1_city": "Alberta Beach",
      "address1_line1": "34564rwedsfgdsf st",
      "emailaddress1": "a.roger@gmail.com",
      "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
      "address1_stateorprovince": "Arizona",
      "middlename": "Of",
      "jobtitle": "Free Text",
      "address1_postalcode": "234532",
      "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
      "address1_country": "Azerbaijan",
      "lastname": "Rodger"
    },
    "BoardContact": {
      "firstname": "Adam",
      "address1_city": "Alberta Beach",
      "address1_line1": "34564rwedsfgdsf st",
      "emailaddress1": "a.roger@gmail.com",
      "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
      "address1_stateorprovince": "Arizona",
      "middlename": "Of",
      "jobtitle": "Free Text",
      "address1_postalcode": "234532",
      "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
      "address1_country": "Azerbaijan",
      "lastname": "Rodger"
    },
    "ProgramCollection": [
      {
        "statecode": 0,
        "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
        "vsd_totaloncallstandbyhours": 100.3,
        "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
        "vsd_mailingpostalcodezip": "V0J 1E2",
        "vsd_country": "Algeria",
        "vsd_emailaddress": "Burnslake@rcmp.com",
        "vsd_mailingaddressline1": "2:147 Highway 35",
        "vsd_mailingaddressline2": "2:PO Box 759",
        "vsd_fax": "2508763452",
        "_vsd_contactlookup_value": "4a9824c3-286c-e911-b80c-00505683fbf4",
        "statuscode": 100000008,
        "_vsd_programtype_value": "41d20ed4-19fc-e911-b812-00505683fbf4",
        "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
        "vsd_provincestate": "British Columbia",
        "vsd_programid": "0e309304-c4e6-e911-b811-00505683fbf4",
        "vsd_addressline1": "147 Highway 35",
        "vsd_addressline2": "PO Box 759",
        "vsd_city": "Athabasca County",
        "vsd_postalcodezip": "V0J1E0",
        "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
        "vsd_phonenumber": "2509483343",
        "vsd_mailingcity": "Beaver County",
        "vsd_mailingcountry": "Angola",
        "vsd_totalscheduledhours": 50.1,
        "vsd_name": "CBVS - MAP VAN - Burns Lake Prov ",
        "vsd_mailingprovincestate": "British Columbia"
      },
      {
        "statecode": 0,
        "_vsd_contractid_value": "9e9b5111-51c9-e911-b80f-00505683fbf4",
        "_vsd_cpu_regiondistrict_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
        "vsd_mailingpostalcodezip": "Y8N 4A5",
        "vsd_country": "Algeria",
        "vsd_emailaddress": "burnslake@burnslake.ca",
        "vsd_mailingaddressline1": "64783 South Street",
        "vsd_mailingaddressline2": "Address Line 2 Test",
        "vsd_fax": "3433334444",
        "_vsd_contactlookup_value": "4d028528-a3db-e911-b811-00505683fbf4",
        "statuscode": 100000008,
        "_vsd_programtype_value": "b8ec7744-17fc-e911-b812-00505683fbf4",
        "_vsd_serviceproviderid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
        "vsd_provincestate": "British Columbia",
        "vsd_programid": "1aae3dad-c4e6-e911-b811-00505683fbf4",
        "vsd_addressline1": "4566 West Street",
        "vsd_addressline2": "Line 2 Test",
        "vsd_city": "Beaver County",
        "vsd_postalcodezip": "V8Y 5A5",
        "_vsd_cpu_regiondistrictlookup2_value": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
        "vsd_phonenumber": "6048393333",
        "vsd_mailingcity": "Athabasca County",
        "vsd_mailingcountry": "Angola",
        "vsd_name": "CBVS - All Crime - Burns Lake Prov",
        "vsd_mailingprovincestate": "British Columbia"
      }
    ],
    "StaffCollection": [
      {
        "firstname": "Adam",
        "address1_city": "Alberta Beach",
        "address1_line1": "34564rwedsfgdsf st",
        "emailaddress1": "a.roger@gmail.com",
        "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
        "address1_stateorprovince": "Arizona",
        "middlename": "Of",
        "jobtitle": "Free Text",
        "address1_postalcode": "234532",
        "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
        "address1_country": "Azerbaijan",
        "lastname": "Rodger"
      },
      {
        "address1_line1": "#15 3rd Ave",
        "address1_city": "Burns Lake",
        "middlename": "Joe",
        "address1_postalcode": "P.O. Box 570",
        "address1_stateorprovince": "British Columbia",
        "jobtitle": "Program Manager",
        "contactid": "4d028528-a3db-e911-b811-00505683fbf4",
        "firstname": "Grady",
        "mobilephone": "2503442234",
        "lastname": "Green",
        "fax": "250-363-394",
        "emailaddress1": "Bradley.Green@email.com",
        "address1_country": "Canada",
        "_parentcustomerid_value": "ee3db438-1ea8-e911-b80e-00505683fbf4",
        "address1_line2": "P.O. Box 570"
      }
    ],
    "RegionDistrictCollection": [
      {
        "vsd_name": "Burns Lake Prov"
      }
    ],
    "ScheduleCollection": [
      {
        "vsd_scheduledendtime": "17:00",
        "vsd_scheduledstarttime": "8:00",
        "vsd_days": "100000001,100000002",
        "vsd_scheduleid": "36e5bb9a-b3c9-e911-b80f-00505683fbf4",
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
        "vsd_cpu_scheduletype": 100000000
      },
      {
        "vsd_scheduledendtime": "9:00",
        "vsd_scheduledstarttime": "8:00",
        "vsd_days": "100000000,100000001,100000002",
        "vsd_scheduleid": "fac3d600-2bf4-e911-b811-00505683fbf4",
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
        "vsd_cpu_scheduletype": 100000001
      },
      {
        "vsd_scheduledendtime": "17:00",
        "vsd_scheduledstarttime": "8:00",
        "vsd_days": "100000000,100000001",
        "vsd_scheduleid": "ac3920c1-a513-ea11-b814-00505683fbf4",
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
        "vsd_cpu_scheduletype": 100000000
      },
      {
        "vsd_scheduledendtime": "17:00",
        "vsd_scheduledstarttime": "8:00",
        "vsd_days": "100000000,100000001,100000002",
        "vsd_scheduleid": "eea6842d-a713-ea11-b814-00505683fbf4",
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
        "vsd_cpu_scheduletype": 100000001
      },
      {
        "vsd_scheduleid": "f092d29f-b122-ea11-b814-00505683fbf4",
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
        "vsd_days": "100000000,100000001,100000002",
        "vsd_scheduledstarttime": "8:00",
        "vsd_scheduledendtime": "17:00"
      },
      {
        "vsd_scheduleid": "9bdcbaeb-b122-ea11-b814-00505683fbf4",
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
        "vsd_days": "100000000,100000001,100000002",
        "vsd_scheduledstarttime": "8:00",
        "vsd_scheduledendtime": "17:00"
      },
      {
        "vsd_scheduleid": "352c4d08-7e23-ea11-b814-00505683fbf4",
        "_vsd_programid_value": "0e309304-c4e6-e911-b811-00505683fbf4",
        "vsd_days": "100000000,100000001,100000002",
        "vsd_scheduledstarttime": "8:00",
        "vsd_scheduledendtime": "17:00"
      }
    ],
    "ProgramContactCollection": [
      {
        "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
        "vsd_programid": "1aae3dad-c4e6-e911-b811-00505683fbf4",
        "vsd_contact_vsd_programid": "362c4d08-7e23-ea11-b814-00505683fbf4"
      }
    ]
  };
}

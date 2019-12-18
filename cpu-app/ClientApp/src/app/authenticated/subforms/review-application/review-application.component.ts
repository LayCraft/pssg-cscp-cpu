import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { TransmogrifierProgramApplication } from '../../../core/models/transmogrifier-program-application.class';

@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.css']
})
export class ReviewApplicationComponent implements OnInit {
  @Input() tpa: TransmogrifierProgramApplication = {
    "contractId": "488de63f-1e07-ea11-b812-00505683fbf4",
    "contractName": "53624545 - Demo",
    "contractNumber": "53624545 - Demo",
    "organizationId": "fd889a40-14b2-e811-8163-480fcff4f621",
    "organizationName": "Village of Burns Lake",
    "userId": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    "cglInsurance": "Agency requesting Province's Master Insurance Program enrolment",
    "administrativeInformation": {
      "staffSubcontractedPersons": [
        {
          "address": {
            "city": "Alberta Beach",
            "line1": "34564rwedsfgdsf st",
            "line2": null,
            "postalCode": "234532",
            "province": "Arizona"
          },
          "email": "a.roger@gmail.com",
          "fax": null,
          "firstName": "Adam",
          "lastName": "Rodger",
          "middleName": "Of",
          "personId": "4a9824c3-286c-e911-b80c-00505683fbf4",
          "userId": "9e9b5111-51c9-e911-b80f-00505683fbf4",
          "phone": null,
          "title": "Free Text",
          "me": true,
          "deactivated": false
        },
        {
          "address": {
            "city": null,
            "line1": null,
            "line2": null,
            "postalCode": null,
            "province": null
          },
          "email": "email@email.com",
          "fax": null,
          "firstName": "Eugene",
          "lastName": "Parks",
          "middleName": null,
          "personId": "a25648e4-3911-ea11-b814-00505683fbf4",
          "userId": null,
          "phone": "6042628333",
          "title": null,
          "me": false,
          "deactivated": false
        },
        {
          "address": {
            "city": null,
            "line1": null,
            "line2": null,
            "postalCode": null,
            "province": null
          },
          "email": null,
          "fax": null,
          "firstName": "Curtis",
          "lastName": "Salamander",
          "middleName": null,
          "personId": "6abae7d1-2916-ea11-b814-00505683fbf4",
          "userId": null,
          "phone": null,
          "title": null,
          "me": false,
          "deactivated": false
        }
      ],
      "compliantEmploymentStandardsAct": true,
      "compliantHumanRights": true,
      "compliantWorkersCompensation": true,
      "staffUnionized": true,
      "staffUnion": "Bootsandcats",
      "ccseaMemberType": "Associate Member",
      "staffSubcontracted": true
    },
    "contactInformation": {
      "emailAddress": "new111@burnslake.ca",
      "faxNumber": "250-546-2922",
      "phoneNumber": "604-233-3433",
      "boardContact": {
        "address": {
          "city": "Abbotsford",
          "line1": "2838 Justice Way",
          "line2": null,
          "postalCode": "V2T 3P5",
          "province": "British Columbia"
        },
        "email": "Daniel.Behrens@apd.bc.ca",
        "fax": null,
        "firstName": "Daniel",
        "lastName": "Behrens",
        "middleName": null,
        "personId": "76c7e13d-84d8-e811-815f-480fcff4f6a1",
        "phone": null,
        "title": "Director of Abbotsford Victim Services"
      },
      "executiveContact": {
        "email": "Carlos.Sarmiento@email.com",
        "fax": null,
        "firstName": "Carlos",
        "lastName": "Sarmiento",
        "middleName": "S",
        "personId": "555ef649-84d8-e811-815f-480fcff4f6a1",
        "phone": null,
        "title": null,
        "me": null,
        "address": {
          "city": "Abbotsford",
          "line1": "2838 Justice Way",
          "line2": null,
          "postalCode": "V2T 3P5",
          "province": "British Columbia"
        }
      },
      "mailingAddress": {
        "city": "Burns Lake",
        "line1": "15 3rd Ave",
        "line2": "P.O. Box 570",
        "postalCode": "V0J 1E1",
        "province": "British Columbia"
      },
      "mainAddress": {
        "city": "Burns Lake",
        "line1": "#15 3rd",
        "line2": "P.O. Box 570",
        "postalCode": "V0J 1E0",
        "province": "British Columbia"
      }
    },
    "programApplications": [
      {
        "contractId": "488de63f-1e07-ea11-b812-00505683fbf4",
        "email": "kevin.lo@quartech.com",
        "faxNumber": "18005551212",
        "formState": "untouched",
        "name": "CB - All Crime - Burns Lake Prov  - 2",
        "phoneNumber": "5551212",
        "programId": "87fbbcf1-1e07-ea11-b812-00505683fbf4",
        "programLocation": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
        "serviceArea": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
        "mainAddress": {
          "line1": "2889 E 12th Ave",
          "city": "Vancouver",
          "postalCode": "V5M4T5",
          "province": "British Columbia"
        },
        "mailingAddress": {
          "city": "Vancouver",
          "line1": "2889 E 12 Ave",
          "postalCode": "V5M4T5",
          "province": "British Columbia"
        },
        "programContact": {
          "email": "Manovikas.Anupoju@quartech.com",
          "fax": null,
          "firstName": "Adam",
          "lastName": "Smith",
          "middleName": "Michael",
          "personId": "12a9e57c-ffcb-e811-8156-480fcfea20b1",
          "phone": "6045556732",
          "title": "Director",
          "userId": null,
          "address": {
            "line1": "4-326 126th St",
            "line2": null,
            "city": "Surrey",
            "postalCode": "V3W 1N2",
            "province": "British Columbia",
            "country": "Canada"
          }
        },
        "revenueSources": [],
        "additionalStaff": [
          {
            "address": {
              "city": "Alberta Beach",
              "line1": "34564rwedsfgdsf st",
              "line2": null,
              "postalCode": "234532",
              "province": "Arizona"
            },
            "email": "a.roger@gmail.com",
            "fax": null,
            "firstName": "Adam",
            "lastName": "Rodger",
            "middleName": "Of",
            "personId": "4a9824c3-286c-e911-b80c-00505683fbf4",
            "userId": "9e9b5111-51c9-e911-b80f-00505683fbf4",
            "phone": null,
            "title": "Free Text",
            "me": true,
            "deactivated": false
          },
          {
            "address": {
              "city": "Burns Lake",
              "line1": "Lakeview Mall",
              "line2": "Street Address 2 Test",
              "postalCode": "V0J 1E0",
              "province": "British Columbia"
            },
            "email": "Bradley.Lopez@email.com",
            "fax": "250-274-3894",
            "firstName": "Bradley",
            "lastName": "Lopez",
            "middleName": "N",
            "personId": "93341b5c-84d8-e811-815f-480fcff4f6a1",
            "userId": null,
            "phone": "6048392202",
            "title": "Board Contact",
            "me": false,
            "deactivated": false
          }
        ],
        "operationHours": [
          {}
        ],
        "standbyHours": [
          {}
        ]
      },
      {
        "contractId": "488de63f-1e07-ea11-b812-00505683fbf4",
        "email": "help@burnslakercmp.gov.bc.ca",
        "faxNumber": "2504739346",
        "formState": "untouched",
        "name": "Burnslake Test Nov 27B",
        "phoneNumber": "2504638234",
        "programId": "9bcc69b0-af10-ea11-b814-00505683fbf4",
        "programLocation": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
        "serviceArea": "a1c507f1-a7a8-e911-b80e-00505683fbf4",
        "mainAddress": {
          "line1": "1234 Street",
          "city": "Burns Lake",
          "postalCode": "V6T9P9",
          "province": "British Columbia"
        },
        "mailingAddress": {
          "city": "Burns Lake",
          "line1": "1234 Street",
          "postalCode": "V6T9P9",
          "province": "British Columbia"
        },
        "programContact": {
          "email": "a.roger@gmail.com",
          "fax": null,
          "firstName": "Barrie",
          "lastName": "Goldenvoice",
          "middleName": null,
          "personId": "e63f7b62-8301-ea11-b812-00505683fbf4",
          "phone": null,
          "title": "Singing Janitor",
          "userId": null,
          "address": {
            "line1": "34564rwedsfgdsf st",
            "line2": null,
            "city": "Alberta Beach",
            "postalCode": "234532",
            "province": "Arizona",
            "country": "Canada"
          }
        },
        "revenueSources": [],
        "additionalStaff": [],
        "operationHours": [
          {
            "monday": true,
            "thursday": true,
            "saturday": true,
            "open": "11:58",
            "closed": "23:02"
          },
          {
            "monday": true,
            "wednesday": true,
            "closed": "09:56",
            "open": "09:35"
          }
        ],
        "standbyHours": [
          {
            "monday": false,
            "sunday": true,
            "saturday": true,
            "open": "00:00",
            "closed": "11:58"
          }
        ]
      }
    ]
  } as TransmogrifierProgramApplication;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { Transmogrifier } from '../core/models/transmogrifier.class';
import { ProfileService } from '../core/services/profile.service';
import { PersonService } from '../core/services/person.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // store the results
  trans: Transmogrifier;
  orgChange: string;

  bceid: string;
  constructor(
    private mainService: MainService,
    private profileService: ProfileService,
    private personService: PersonService,
  ) { }
  ngOnInit() {
    this.bceid = "9e9b5111-51c9-e911-b80f-00505683fbf4";
    this.orgChange = `{
  "BCeID": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  "StaffCollection": [
    {
    "contactid": "4a9824c3-286c-e911-b80c-00505683fbf4",
    "firstname": "Adam",
    "lastname": "Rodger",
    "address1_city": "Alberta Beach",
    "address1_line1": "34564rwedsfgdsf st",
    "address1_stateorprovince": "Arizona",
    "address1_postalcode": "234532",
    "emailaddress1": "a.roger@gmail.com"
    },
    {
    "firstname": "Adam New1",
    "lastname": "Rodger New1",
    "address1_city": "Vancouver",
    "address1_line1": "232 Smith St",
    "address1_stateorprovince": "British Columbia",
    "address1_postalcode": "V5R 6H7",
    "emailaddress1": "AdamNew1@gmail.com"
    }
  ]
}`;
    this.refresh();
  }

  postOrg() {
    this.profileService.updateOrg(JSON.parse(this.orgChange)).subscribe(o => {
      console.log(o);
      this.refresh();
    },
      err => alert(JSON.stringify(err))
    );
  }
  postUsers() {
    this.personService.updatePersons(JSON.parse(this.orgChange)).subscribe(o => {
      console.log(o);
      this.refresh();
    },
      err => alert(JSON.stringify(err))
    );
  }

  refresh() {
    //set the current object
    this.mainService.getBlob(this.bceid).subscribe(t => {
      this.trans = new Transmogrifier(t);
    });
  }
}

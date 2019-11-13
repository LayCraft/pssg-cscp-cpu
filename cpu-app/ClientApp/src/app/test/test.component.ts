import { Component, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { Transmogrifier } from '../core/models/transmogrifier.class';
import { ProfileService } from '../core/services/profile.service';
import { iDynamicsPostOrg } from '../core/models/dynamics-post';

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
  ) { }
  ngOnInit() {
    this.bceid = "9e9b5111-51c9-e911-b80f-00505683fbf4";
    this.orgChange = `{
  "BCeID": "9e9b5111-51c9-e911-b80f-00505683fbf4",
  "Organization": {
    "vsd_ExecutiveContactIdfortunecookiebind": "4a9824c3-286c-e911-b80c-00505683fbf4",
    "emailaddress1": "village@burnslake.ca",
    "fax": "250-546-2922",
    "telephone1": "250-692-7587",
    "address2_city": "Burns Lake",
    "address2_line1": "15 3rd Ave",
    "address2_line2": "P.O. Box 570",
    "address2_postalcode": "V0J 1E1",
    "address2_stateorprovince": "British Columbia",
    "address1_city": "Burns Lake",
    "address1_line1": "#15 3rd Ave",
    "address1_line2": "P.O. Box 570",
    "address1_postalcode": "V0J 1E0",
    "address1_stateorprovince": "British Columbia",
    "accountid": "ee3db438-1ea8-e911-b80e-00505683fbf4"
  }
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
  refresh() {
    //set the current object
    this.mainService.getBlob(this.bceid).subscribe(t => {
      this.trans = new Transmogrifier(t);
    });
  }
}

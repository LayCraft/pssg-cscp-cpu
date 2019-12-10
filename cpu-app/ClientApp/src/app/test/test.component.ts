import { Component, OnInit } from '@angular/core';
import { ProgramApplicationService } from '../core/services/program-application.service';
import { TransmogrifierProgramApplication } from '../core/models/transmogrifier-program-application.class';
import { iDynamicsScheduleFResponse, iDynamicsBlob } from '../core/models/dynamics-blob';
import { StateService } from '../core/services/state.service';
import { iPerson } from '../core/models/person.class';
import { Transmogrifier } from '../core/models/transmogrifier.class';
import { MainService } from '../core/services/main.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  dynamics;
  trans: TransmogrifierProgramApplication;
  staff: iPerson[];
  constructor(
    private programApplicationService: ProgramApplicationService,
    private stateService: StateService,
    private mainService: MainService,
  ) { }
  ngOnInit() {
    this.programApplicationService.getScheduleF('9e9b5111-51c9-e911-b80f-00505683fbf4').subscribe((f: iDynamicsScheduleFResponse) => {
      this.dynamics = f;
      this.trans = new TransmogrifierProgramApplication(f);
      console.log(this.trans);
    });

    const userId = '9e9b5111-51c9-e911-b80f-00505683fbf4';
    const orgId = 'fd889a40-14b2-e811-8163-480fcff4f621';

    // on login collect the information from the organization id
    this.mainService.getBlob(userId, orgId).subscribe(
      (m: iDynamicsBlob) => {
        // collect the blob into a useful object
        const mainData = new Transmogrifier(m);
        // save the useful blob of viewmodels
        this.stateService.main.next(mainData);
        // save the user that matches the current bceid
        this.stateService.currentUser.next(mainData.persons.filter(p => p.userId === userId)[0]);
        // set the logged in state
        this.stateService.loggedIn.next(true);
      }
    );
    this.stateService.main.subscribe((t: Transmogrifier) => this.staff = t.persons)
  }
}

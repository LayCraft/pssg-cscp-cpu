import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { iMinistryUser } from '../../../core/models/ministry-user';
import { nameAssemble } from '../../../core/constants/name-assemble';

@Component({
  selector: 'app-ministry-contact-box',
  templateUrl: './ministry-contact-box.component.html',
  styleUrls: ['./ministry-contact-box.component.css']
})
export class MinistryContactBoxComponent implements OnInit {
  ministryUser: iMinistryUser;
  nameAssemble = nameAssemble;
  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.stateService.main.subscribe(m => this.ministryUser = m.ministryContact);
  }
}

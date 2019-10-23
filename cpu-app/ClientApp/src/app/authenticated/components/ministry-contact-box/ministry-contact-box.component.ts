import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { iMinistryUser } from 'src/app/core/models/ministry-user';

@Component({
  selector: 'app-ministry-contact-box',
  templateUrl: './ministry-contact-box.component.html',
  styleUrls: ['./ministry-contact-box.component.css']
})
export class MinistryContactBoxComponent implements OnInit {
  ministryUser: iMinistryUser;
  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.stateService.main.subscribe(m => this.ministryUser = m.ministryContact);
  }
}

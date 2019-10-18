import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  // this is to hold onto the state service. It is always onscreen. If it dissapears the state service gets destroyed.
  trans: Transmogrifier;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    // collect the state.
    this.stateService.main.subscribe(s => {
      this.trans = s;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  trans: Transmogrifier;
  categories = ['upcoming', 'current', 'past'];

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {

    // always display the current main collection
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { iContract } from '../../core/models/contract.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  trans: Transmogrifier;
  categories = ['upcoming', 'current', 'past'];
  upcomingContracts: iContract[] = [];
  currentContracts: iContract[] = [];
  pastContracts: iContract[] = [];
  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    // always display the current main collection
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;

      console.log("dashboard subscribed data");
      console.log(this.trans);
      // split the contracts into something useful for the dashboard view
      if (m.contracts) {
        this.upcomingContracts = m.contracts.filter((c: iContract) => c.category === this.categories[0]);
        this.currentContracts = m.contracts.filter((c: iContract) => c.category === this.categories[1]);
        this.pastContracts = m.contracts.filter((c: iContract) => c.category === this.categories[2]);
      }
    });
  }
}

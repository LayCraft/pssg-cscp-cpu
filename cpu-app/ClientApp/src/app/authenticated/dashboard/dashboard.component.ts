import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { iContract } from '../../core/models/contract.interface';
import { Subscription } from 'rxjs';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any;
  trans: Transmogrifier;
  categories = ['upcoming', 'current', 'past'];
  upcomingContracts: iContract[] = [];
  currentContracts: iContract[] = [];
  pastContracts: iContract[] = [];
  currentYear: number;
  private stateSubscription: Subscription;
  constructor(
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    // always display the current main collection
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
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
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}

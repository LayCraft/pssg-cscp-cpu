import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-state-holder',
  templateUrl: './state-holder.component.html',
  styleUrls: ['./state-holder.component.css']
})
export class StateHolderComponent implements OnInit, OnDestroy {
  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    // this quietly watches the application state and makes sure that something is subscribed to the stateservice if someone is logged in.
    this.stateService.main.subscribe();
    console.log("Logged in");
  }
  ngOnDestroy() {
    console.log("Logged out");
  }

}

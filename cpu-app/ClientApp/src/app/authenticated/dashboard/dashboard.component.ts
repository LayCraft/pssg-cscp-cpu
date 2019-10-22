import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from 'src/app/core/models/transmogrifier.class';
import { iTask } from 'src/app/core/models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trans: Transmogrifier;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.stateService.main.subscribe(m => {
      this.trans = m;
    });
  }
  filterTasks(tasks: iTask[], contractId: string): iTask[] {
    return tasks.filter(t => t.contractId === contractId);
  }
}

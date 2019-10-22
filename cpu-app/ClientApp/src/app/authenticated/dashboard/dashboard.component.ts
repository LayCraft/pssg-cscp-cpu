import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { iTask } from '../../core/models/task';

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
  filterTasks(contractId: string, tasks: iTask[]): iTask[] {
    const filteredTasks: iTask[] = [];
    // select all tasks with matching contract ids
    for (let task of tasks) {
      if (task.contractId === contractId) {
        filteredTasks.push(task);
      }
    }
    console.log(tasks);
    return filteredTasks;
  }
}

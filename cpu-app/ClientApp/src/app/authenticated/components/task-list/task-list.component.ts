import { Component, OnInit, Input } from '@angular/core';
import { iContract } from '../../../core/models/contract.interface';
import { TaskStatus } from '../../../core/constants/task-status';
import { FormTypes } from '../../../core/constants/form-types';
import { iTask } from '../../../core/models/task';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() contract: iContract;

  tabs: string[];
  currentTab: string;

  statuses: string[];
  formTypes: string[];

  completeTasks: iTask[] = [];
  incompleteTasks: iTask[] = [];

  constructor() {
    this.tabs = ['Current Tasks', 'Completed', 'Programs'];
    this.currentTab = this.tabs[0];
    this.statuses = TaskStatus;
    this.formTypes = FormTypes;
  }

  ngOnInit() {
    // split tasks into current, completed and programs
    this.contract.tasks.forEach(task => {
      if (task.isCompleted) {
        this.completeTasks.push(task);
      } else {
        this.incompleteTasks.push(task);
      }
    });
  }

  setCurrentTab(tabname: string) {
    this.currentTab = tabname;
  }
}

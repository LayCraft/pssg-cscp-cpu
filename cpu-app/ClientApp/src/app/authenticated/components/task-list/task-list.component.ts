import { Component, OnInit, Input } from '@angular/core';
import { iContract } from '../../../core/models/contract.interface';
import { TaskStatus } from '../../../core/constants/task-status';
import { FormTypes } from '../../../core/constants/form-types';
import { iTask } from '../../../core/models/task.interface';
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

  constructor() {
    this.tabs = ['Current Tasks', 'Completed', 'Programs'];
    this.currentTab = this.tabs[0];
    this.statuses = TaskStatus;
    this.formTypes = FormTypes;
  }

  ngOnInit() { }

  setCurrentTab(tabname: string) {
    this.currentTab = tabname;
  }
}

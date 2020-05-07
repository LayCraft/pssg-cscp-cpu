import { Component, OnInit, Input } from '@angular/core';
import { iContract } from '../../../core/models/contract.interface';
import { TaskStatus } from '../../../core/constants/task-status';
import { formTypes } from '../../../core/constants/form-types';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() contract: iContract;

  tabs: any;
  currentTab: string;

  statuses: string[];
  formTypes: string[];

  documents: any[] = []; //for testing

  constructor() {
    this.tabs = {
      "tasksDue": 'Tasks Due',
      "tasksCompleted": 'Completed Tasks',
      "editProgramInformation": 'Update Program/Contact Information',
      "yourDocuments": 'Your Documents',
      "messages": 'Messages'
    };
    this.currentTab = this.tabs.tasksDue;
    this.statuses = TaskStatus;
    this.formTypes = formTypes;


    this.documents.push({ name: "test1", source: "http://www.africau.edu/images/default/sample.pdf", availableDate: new Date() });
    this.documents.push({ name: "test2", source: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", availableDate: new Date() });
  }

  ngOnInit() { }

  setCurrentTab(tab: any) {
    this.currentTab = tab;
  }

  downloadDocument(doc: any) {
    window.open(doc.source);
  }
}

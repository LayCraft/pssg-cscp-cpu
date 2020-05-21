import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { iContract } from '../../../core/models/contract.interface';
import { TaskStatus } from '../../../core/constants/task-status';
import { formTypes } from '../../../core/constants/form-types';
import { FileService } from '../../../core/services/file.service';
import { StateService } from '../../../core/services/state.service';
import { Subscription } from 'rxjs';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { iDynamicsFile, iDynamicsDocument } from '../../../core/models/dynamics-blob';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() contract: iContract;
  trans: Transmogrifier;

  tabs: any;
  currentTab: string;

  statuses: string[];
  formTypes: string[];

  documentCollection: iDynamicsDocument[] = [];
  private stateSubscription: Subscription;

  constructor(private stateService: StateService,
    public fileService: FileService) {
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

  }

  ngOnInit() {
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;
    });
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  setCurrentTab(tab: any) {
    this.currentTab = tab;
  }

  downloadDocument(doc: any) {
    window.open(doc.source);
  }

  getContractDocuments(contractId: string) {
    this.fileService.download(this.trans.accountId, this.trans.userId, contractId).subscribe(
      (d: iDynamicsFile) => {
        console.log(d);
        if (d['error'] && d['error']['code']) {
          // something has gone wrong. Show the developer the error
          alert(d['error']['code'] + ': There has been a data problem retrieving this file. Please let your ministry contact know that you have seen this error.');
          console.log('Dynamics has returned: ', d);
        } else {
          this.documentCollection = d.DocumentCollection;
        }
      });
  }
}

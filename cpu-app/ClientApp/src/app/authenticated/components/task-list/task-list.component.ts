import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { iContract } from '../../../core/models/contract.interface';
import { TaskStatus } from '../../../core/constants/task-status';
import { formTypes } from '../../../core/constants/form-types';
import { FileService } from '../../../core/services/file.service';
import { StateService } from '../../../core/services/state.service';
import { Subscription } from 'rxjs';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { iDynamicsFile, iDynamicsDocument, iDynamicsMonthlyStatistics, iDynamicsDataCollection } from '../../../core/models/dynamics-blob';
import { StatusReportService } from '../../../core/services/status-report.service';
import { months } from '../../../core/constants/month-codes';

enum StatusReasons {
  Received = 1,
  Processing = 100000000,
  Approved = 100000001,
  Information_Denied = 100000002,
}

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

  didLoadStats: boolean = false;
  loadingStats: boolean = false;
  completedStats: iDynamicsMonthlyStatistics;
  dataCollection: iDynamicsDataCollection[] = [];


  didLoadDocuments: boolean = false;
  documentCollection: iDynamicsDocument[] = [];
  private stateSubscription: Subscription;
  loadingDocuments: boolean = false;

  organizationId: string;
  userId: string;

  StatusReasons = StatusReasons;

  constructor(private stateService: StateService,
    private statusReportService: StatusReportService,
    public fileService: FileService) {
    this.tabs = {
      'tasksDue': 'Tasks Due',
      'tasksCompleted': 'Completed Tasks',
      'completedStats': 'Completed Monthly Reports',
      'editProgramInformation': 'Update Program/Contact Information',
      'yourDocuments': 'Your Documents',
      'messages': 'Messages'
    };
    this.currentTab = this.tabs.tasksDue;
    this.statuses = TaskStatus;
    this.formTypes = formTypes;

  }

  ngOnInit() {
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;

      this.organizationId = this.stateService.main.getValue().organizationId;
      this.userId = this.stateService.main.getValue().userId;
    });
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  setCurrentTab(tab: any) {
    this.currentTab = tab;
  }

  getCompletedMonthlyStats(contractId: string) {
    if (this.didLoadStats) {
      return;
    }

    console.log("getting monthly stats");
    this.loadingStats = true;



    this.statusReportService.getMonthlyStats(this.organizationId, this.userId, contractId).subscribe((res: iDynamicsMonthlyStatistics) => {
      console.log("Monthly Stats:");
      console.log(res);
      this.didLoadStats = true;
      this.loadingStats = false;
      this.completedStats = res;
      this.dataCollection = this.completedStats.DataCollection;
      for (let data of this.dataCollection) {
        data.reportingPeriod = Object.keys(months).find(key => months[key] === data.vsd_reportingperiod);
      }
      console.log(this.dataCollection);
    });
  }



  downloadDocument(doc: iDynamicsDocument) {
    // let file = "data:application/octet-stream;charset=utf-16le;base64," + doc.body;
    // window.open(file);

    let downloadLink = document.createElement("a");
    downloadLink.href = "data:application/octet-stream;base64," + doc.body;
    downloadLink.download = doc.filename;

    // append the anchor to document body
    document.body.appendChild(downloadLink);

    // fire a click event on the anchor
    downloadLink.click();

    // cleanup: remove element and revoke object URL
    document.body.removeChild(downloadLink);
  }

  getContractDocuments(contractId: string) {
    if (this.didLoadDocuments) {
      //already got documents, don't need to load again
      return;
    }
    // this.documentCollection = [];
    this.loadingDocuments = true;
    this.fileService.download(this.trans.organizationId, this.trans.userId, contractId).subscribe(
      (d: iDynamicsFile) => {
        this.didLoadDocuments = true;
        this.loadingDocuments = false;
        // console.log(d);
        if (d['error'] && d['error']['code']) {
          // something has gone wrong. Show the developer the error
          alert(d['error']['code'] + ': There has been a data problem retrieving this file. Please let your ministry contact know that you have seen this error.');
          // console.log('Dynamics has returned: ', d);
        } else {
          this.documentCollection = d.DocumentCollection;
          this.documentCollection = this.documentCollection.filter(d => d.filename.indexOf(".pdf") > 0);
        }
      });
  }
}

import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { TransmogrifierProgramApplication } from '../../../core/models/transmogrifier-program-application.class';
import { iProgramApplication } from '../../../core/models/program-application';

@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.css']
})
export class ReviewApplicationComponent implements OnInit {
  @Input() tpa: TransmogrifierProgramApplication;

  currentTab: string = 'Application Information';
  tabs: string[] = ['Application Information'];

  constructor() { }

  ngOnInit() {
    this.tpa.programApplications.forEach((p: iProgramApplication) => { this.tabs.push(p.name) });
  }
  nextPage() {
    const index = this.tabs.indexOf(this.currentTab);
    if (!(index >= this.tabs.length - 1)) {
      this.currentTab = this.tabs[index + 1];
      window.scrollTo(0, 0);
    }
  }
  prevPage() {
    const index = this.tabs.indexOf(this.currentTab);
    if (index > 0) {
      this.currentTab = this.tabs[index - 1];
      window.scrollTo(0, 0);
    }
  }
}

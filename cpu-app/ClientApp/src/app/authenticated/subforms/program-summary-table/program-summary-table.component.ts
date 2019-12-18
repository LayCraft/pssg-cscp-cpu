import { Component, OnInit, Input } from '@angular/core';
import { iProgramApplication } from '../../../core/models/program-application.class';

@Component({
  selector: 'app-program-summary-table',
  templateUrl: './program-summary-table.component.html',
  styleUrls: ['./program-summary-table.component.css']
})
export class ProgramSummaryTableComponent implements OnInit {
  @Input() pa: iProgramApplication;
  constructor() { }

  ngOnInit() {
  }

}

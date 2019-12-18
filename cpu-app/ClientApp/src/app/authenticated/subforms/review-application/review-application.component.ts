import { Component, OnInit, Input } from '@angular/core';
import { TransmogrifierProgramApplication } from '../../../core/models/transmogrifier-program-application.class';

@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.css']
})
export class ReviewApplicationComponent implements OnInit {
  @Input() tpa: TransmogrifierProgramApplication;
  constructor() { }

  ngOnInit() {
  }

}

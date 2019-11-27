import { Component, OnInit } from '@angular/core';
import { iDynamicsScheduleGResponse } from '../core/models/dynamics-schedule-g-response';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // store the results
  input: iDynamicsScheduleGResponse;
  output: any;

  constructor(
  ) { }
  ngOnInit() {

  }
}

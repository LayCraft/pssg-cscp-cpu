import { Component, OnInit } from '@angular/core';
import { iDynamicsExpenseReport } from '../core/models/dynamics-expense-report';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // store the results
  input: iDynamicsExpenseReport;
  output: any;

  constructor(
  ) { }
  ngOnInit() {

  }
}

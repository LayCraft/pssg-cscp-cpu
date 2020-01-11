import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iExpenseTableMeta } from '../expense-table/expense-table.component';
import { iSalaryAndBenefits } from '../../../core/models/salary-and-benefits.interface';
import { SalaryAndBenefits } from '../../../core/models/salary-and-benefits.class';

@Component({
  selector: 'app-personnel-expense-table',
  templateUrl: './personnel-expense-table.component.html',
  styleUrls: ['./personnel-expense-table.component.css']
})
export class PersonnelExpenseTableComponent implements OnInit {
  @Input() salariesAndBenefits: iSalaryAndBenefits[] = [];
  @Output() salariesAndBenefitsChange = new EventEmitter<iSalaryAndBenefits[]>();
  @Output() meta = new EventEmitter<iExpenseTableMeta>();

  salariesAndBenefitsForm: iSalaryAndBenefits[] = [];

  totalBenefitsCost: number = 0;
  totalSalaryCost: number = 0;
  totalTotalCost: number = 0;
  totalVscp: number = 0;
  totalGrand: number = 0;

  constructor() { }

  ngOnInit() {
    this.salariesAndBenefits.forEach(e => {
      this.salariesAndBenefitsForm.push(e);
    });
  }

  addExpenseItem(): void {
    this.salariesAndBenefitsForm.push(new SalaryAndBenefits());
    this.calculateTotals();
  }
  removeExpenseItem(index: number): void {
    // splice is acting unpredictably so I'm doing it with a for loop
    const newArray = [];
    for (let i = 0; i < this.salariesAndBenefitsForm.length; i++) {
      if (i !== index) {
        newArray.push(this.salariesAndBenefitsForm[i]);
      }
    }
    this.salariesAndBenefitsForm = newArray;
    this.calculateTotals();
  }
  calculateTotals() {
    function reducer(prev: number = 0, curr: number = 0): number {
      // type check the input
      if (typeof curr === 'number') {
        return prev + curr;
      } else {
        return prev;
      }
    }
    if (this.salariesAndBenefitsForm.length > 0) {
      // total of salary
      this.totalSalaryCost = this.salariesAndBenefitsForm.map(rs => rs.salary).reduce(reducer) || 0;
      // total of benefits
      this.totalBenefitsCost = this.salariesAndBenefitsForm.map(rs => rs.benefits).reduce(reducer) || 0;
      this.salariesAndBenefitsForm.forEach(s => {
        s.totalCost = s.salary + s.benefits;
      });
    }

    // total of totalCost
    if (this.salariesAndBenefitsForm.length > 0) {
      this.totalTotalCost = this.salariesAndBenefitsForm.map(rs => rs.totalCost).reduce(reducer) || 0;
    }

    // total of vscp
    let totalVscpDefaults = 0;
    let totalVscpCustom = 0;
    if (this.salariesAndBenefitsForm.length > 0) {
      totalVscpCustom = this.salariesAndBenefitsForm.map(rs => rs.fundedFromVscp).reduce(reducer) || 0;
    }
    this.totalVscp = totalVscpDefaults + totalVscpCustom;

    // after every calculate, output the json to the parent.
    this.salariesAndBenefitsChange.emit(this.salariesAndBenefitsForm);
    this.meta.emit({
      totalCost: this.totalTotalCost,
      totalVscp: this.totalVscp,
    });
  }
}

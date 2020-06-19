import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iExpenseItem } from '../../../core/models/expense-item.interface';
import { ExpenseItem } from '../../../core/models/expense-item.class';
import { FormHelper } from '../../../core/form-helper';

export interface iExpenseTableMeta {
  totalCost: number;
  totalVscp: number;
  vscpApprovedAmount: number;
}
@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {
  // default expense items are the ones sent from dynamics which make up the top of the table
  @Input() defaultExpenseItems: iExpenseItem[] = [];
  @Input() vscpApprovedAmount: number = 0;
  @Output() defaultExpenseItemsChange = new EventEmitter<iExpenseItem[]>();
  // expense items are the ones that the user has entered on their own
  @Input() expenseItems: iExpenseItem[] = [];
  @Output() expenseItemsChange = new EventEmitter<iExpenseItem[]>();
  @Input() otherDescription: string;
  @Output() meta = new EventEmitter<iExpenseTableMeta>();
  @Input() peopleExpense: boolean = false;

  defaultExpenseItemsForm: iExpenseItem[] = [];
  expenseItemsForm: iExpenseItem[] = [];

  totalTotalCost: number = 0;
  totalVscp: number = 0;
  totalGrand: number = 0;

  public formHelper = new FormHelper();

  constructor() { }

  ngOnInit() {
    // build the main list
    if (this.defaultExpenseItems) this.defaultExpenseItems.forEach(e => {
      this.defaultExpenseItemsForm.push(e);
    });
    // build the custom list
    if (this.expenseItems) this.expenseItems.forEach(e => {
      this.expenseItemsForm.push(e);
    });
    // now that we put them all in recalculate the totals
    this.calculateTotals();
  }

  addExpenseItem(): void {
    this.expenseItemsForm.push(new ExpenseItem());
    this.calculateTotals();
  }
  removeExpenseItem(index: number): void {
    let expenseToRemove = this.expenseItemsForm[index];
    if (expenseToRemove.uuid) {
      expenseToRemove.isActive = false;
    }
    else {
      this.expenseItemsForm.splice(index, 1);
    }

    // splice is acting unpredictably so I'm doing it with a for loop
    // const newArray = [];
    // for (let i = 0; i < this.expenseItemsForm.length; i++) {
    //   if (i !== index) {
    //     newArray.push(this.expenseItemsForm[i]);
    //   }
    // }
    // this.expenseItemsForm = newArray;
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

    let activeExpenseItems = this.expenseItemsForm.filter(ex => ex.isActive);
    // total of totalCost
    let totalCostDefaults = 0;
    let totalCostCustom = 0;
    if (this.defaultExpenseItemsForm.length > 0) {
      totalCostDefaults = this.defaultExpenseItemsForm.map(rs => (rs.cost || 0)).reduce(reducer) || 0;
    }
    if (activeExpenseItems.length > 0) {
      totalCostCustom = activeExpenseItems.map(rs => (rs.cost || 0)).reduce(reducer) || 0;
    }
    this.totalTotalCost = totalCostDefaults + totalCostCustom;

    // total of vscp
    let totalVscpDefaults = 0;
    let totalVscpCustom = 0;
    this.totalVscp = 0;
    if (this.defaultExpenseItemsForm.length > 0) {
      totalVscpDefaults = this.defaultExpenseItemsForm.map(rs => {
        if (rs.fundedFromVscp > (rs.cost || 0)) {
          rs.fundedFromVscp = (rs.cost || 0);
          rs.fundedFromVscpMask = rs.fundedFromVscp.toString();
        }
        return rs.fundedFromVscp;
      }).reduce(reducer) || 0;
    }
    if (activeExpenseItems.length > 0) {
      totalVscpCustom = activeExpenseItems.map(rs => {
        if (rs.fundedFromVscp > (rs.cost || 0)) {
          rs.fundedFromVscp = (rs.cost || 0);
          rs.fundedFromVscpMask = rs.fundedFromVscp.toString();
        }
        return rs.fundedFromVscp;
      }).reduce(reducer) || 0;
    }
    this.totalVscp = totalVscpDefaults + totalVscpCustom;

    // after every calculate, output the json to the parent.
    this.defaultExpenseItemsChange.emit(this.defaultExpenseItemsForm);
    this.expenseItemsChange.emit(this.expenseItemsForm);
    this.meta.emit({
      totalCost: this.totalTotalCost,
      totalVscp: this.totalVscp,
      vscpApprovedAmount: this.vscpApprovedAmount
    });
  }
}

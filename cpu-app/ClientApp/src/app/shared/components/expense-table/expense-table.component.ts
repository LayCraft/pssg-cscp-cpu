import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iExpenseItem, ExpenseItem } from 'src/app/core/models/budget-proposal.class';
export interface iExpenseTableMeta {
	totalCost: number;
	totalVscp: number;
}
@Component({
	selector: 'app-expense-table',
	templateUrl: './expense-table.component.html',
	styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit {
	@Input() defaultExpenseItems: iExpenseItem[] = [];
	@Output() defaultExpenseItemsChange = new EventEmitter<iExpenseItem[]>();
	@Input() expenseItems: iExpenseItem[] = [];
	@Output() expenseItemsChange = new EventEmitter<iExpenseItem[]>();
	@Input() otherDescription: string;
	@Output() meta = new EventEmitter<iExpenseTableMeta>();

	defaultExpenseItemsForm: iExpenseItem[] = [];
	expenseItemsForm: iExpenseItem[] = [];

	totalTotalCost: number = 0;
	totalVscp: number = 0;
	totalGrand: number = 0;

	constructor() { }

	ngOnInit() {
		this.defaultExpenseItems.forEach(e => {
			this.defaultExpenseItemsForm.push(e);
		});
		this.expenseItems.forEach(e => {
			this.expenseItemsForm.push(e);
		});
	}

	addExpenseItem(): void {
		this.expenseItemsForm.push(new ExpenseItem());
		this.calculateTotals();
	}
	removeExpenseItem(index: number): void {
		// splice is acting unpredictably so I'm doing it with a for loop
		const newArray = [];
		for (let i = 0; i < this.expenseItemsForm.length; i++) {
			if (i !== index) {
				newArray.push(this.expenseItemsForm[i]);
			}
		}
		this.expenseItemsForm = newArray;
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
		// total of totalCost
		let totalCostDefaults = 0;
		let totalCostCustom = 0;
		if (this.defaultExpenseItemsForm.length > 0) {
			totalCostDefaults = this.defaultExpenseItemsForm.map(rs => rs.totalCost).reduce(reducer) || 0;
		}
		if (this.expenseItemsForm.length > 0) {
			totalCostCustom = this.expenseItemsForm.map(rs => rs.totalCost).reduce(reducer) || 0;
		}
		this.totalTotalCost = totalCostDefaults + totalCostCustom;

		// total of vscp
		let totalVscpDefaults = 0;
		let totalVscpCustom = 0;
		if (this.defaultExpenseItemsForm.length > 0) {
			totalVscpDefaults = this.defaultExpenseItemsForm.map(rs => rs.fundedFromVCSP).reduce(reducer) || 0;
		}
		if (this.expenseItemsForm.length > 0) {
			totalVscpCustom = this.expenseItemsForm.map(rs => rs.fundedFromVCSP).reduce(reducer) || 0;
		}
		this.totalVscp = totalVscpDefaults + totalVscpCustom;

		// after every calculate, output the json to the parent.
		this.defaultExpenseItemsChange.emit(this.defaultExpenseItemsForm);
		this.expenseItemsChange.emit(this.expenseItemsForm);
		this.meta.emit({
			totalCost: this.totalTotalCost,
			totalVscp: this.totalVscp,
		});
	}
}

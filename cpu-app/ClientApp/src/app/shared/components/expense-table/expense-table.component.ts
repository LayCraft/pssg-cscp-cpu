import { Component, OnInit } from '@angular/core';
import { iExpenseItem, ExpenseItem } from 'src/app/core/models/budget-proposal.class';

@Component({
	selector: 'app-expense-table',
	templateUrl: './expense-table.component.html',
	styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit {

	defaultExpenseItemsForm: iExpenseItem[] = [];
	expenseItemsForm: iExpenseItem[] = [];

	totalTotalCost: number = 0;
	totalVscp: number = 0;
	totalGrand: number = 0;

	constructor() { }

	ngOnInit() {
	}
	// addRevenueSource() {
	// 	this.revenueSourcesForm.push(new RevenueSource());
	// 	this.calculateTotals();
	// }
	// removeRevenueSource(index: number): void {
	// 	// splice is acting unpredictably so I'm doing it with a for loop
	// 	const newArray = [];
	// 	for (let i = 0; i < this.revenueSourcesForm.length; i++) {
	// 		if (i !== index) {
	// 			newArray.push(this.revenueSourcesForm[i]);
	// 		}
	// 	}
	// 	this.revenueSourcesForm = newArray;
	// 	this.calculateTotals();
	// }

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
		// this.revenueSourcesChange.emit(this.revenueSourcesForm);
	}
}

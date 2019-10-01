import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';
import { RevenueSource, iRevenueSource } from 'src/app/core/models/revenue-source.class';
import { iExpenseItem, ExpenseItem } from 'src/app/core/models/budget-proposal.class';

@Component({
	selector: 'app-program-budget',
	templateUrl: './program-budget.component.html',
	styleUrls: ['./program-budget.component.scss']
})
export class ProgramBudgetComponent implements OnInit {
	@Input() stepperElement: iStepperElement;
	currentTab: string;
	tabs: string[];

	revenueSources: iRevenueSource[] = [];
	expenseItems: iExpenseItem[] = [];
	defaultExpenseItems: iExpenseItem[] = [
		{ itemName: 'Program - related' } as iExpenseItem,
		{ itemName: 'Program - related office supplies / software' } as iExpenseItem,
		{ itemName: 'Program - related travel' } as iExpenseItem,
		{ itemName: 'Utilities' } as iExpenseItem,
		{ itemName: 'Phone' } as iExpenseItem,
		{ itemName: 'Staff training and associated travel' } as iExpenseItem,
		{ itemName: 'Resource materials / printing costs' } as iExpenseItem,
		{ itemName: 'Volunteer appreciation / honorariums' } as iExpenseItem,
		{ itemName: 'Property maintenance' } as iExpenseItem,
	];
	employees: iExpenseItem[] = [];

	adminExpenseItems: iExpenseItem[] = [];
	defaultAdminExpenseItems: iExpenseItem[] = [
		{ itemName: 'Management salary/benefits' } as iExpenseItem,
		{ itemName: 'Administrative support wages/benefits' } as iExpenseItem,
		{ itemName: 'Administration-related' } as iExpenseItem,
		{ itemName: 'Administrative-related utilities' } as iExpenseItem,
		{ itemName: 'Bookeeping/bank fees' } as iExpenseItem,
	];

	constructor(
	) {
		this.tabs = ['Program Revenue Information', 'Program Expense'];
		this.currentTab = this.tabs[0];
	}

	ngOnInit() {
		this.revenueSources.push(new RevenueSource());
		this.expenseItems.push(new ExpenseItem());
		this.adminExpenseItems.push(new ExpenseItem());
		this.employees.push(new ExpenseItem());
	}
}











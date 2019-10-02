import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';
import { RevenueSource, iRevenueSource } from 'src/app/core/models/revenue-source.class';
import { iExpenseItem, ExpenseItem } from 'src/app/core/models/budget-proposal.class';
import { iExpenseTableMeta } from 'src/app/shared/components/expense-table/expense-table.component';

@Component({
	selector: 'app-program-budget',
	templateUrl: './program-budget.component.html',
	styleUrls: ['./program-budget.component.scss']
})
export class ProgramBudgetComponent implements OnInit {
	@Input() stepperElement: iStepperElement;
	currentTab: string;
	tabs: string[];
	meta: {} = {
		totals: {
			// the default totals collector
			totalCost: 0,
			totalVscp: 0,
			totalPercentFundedByVscp: 0,
		}
	};

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

	// these are programatically referenced so it is nice to have the constants
	sections: string[] = [
		'Salaries and Benefits',
		'Program Delivery Costs',
		'Administration Costs',
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
	collectMeta(event: iExpenseTableMeta, name: string) {
		function percentify(event: iExpenseTableMeta): number {
			// can't divide by zero
			if (event.totalCost > 0) {
				// too many decimal points onscreen
				return Math.round((event.totalVscp / event.totalCost) * 100);
			} else {
				return 0;
			}
		}

		// save the event meta for display in the summary boxes.
		this.meta[name] = {
			name, totalPercentFundedByVscp: percentify(event), ...event
		};

		// accumulator object in the meta array
		this.meta['totals'] = {
			totalCost: 0,
			totalVscp: 0,
			totalPercentFundedByVscp: 0,
		}
		for (let i = 0; i < this.sections.length; i++) {
			// if a value is calculated for the section add it to the grand total
			if (this.meta[this.sections[i]]) {
				// check that this is not infinity
				this.meta['totals'].totalCost = this.meta['totals'].totalCost + this.meta[this.sections[i]].totalCost;
			}
			if (this.meta[this.sections[i]]) {
				this.meta['totals'].totalVscp = this.meta['totals'].totalVscp + this.meta[this.sections[i]].totalVscp;
			}
		}
		this.meta['totals'].totalPercentFundedByVscp = percentify(this.meta['totals']);
	}
}

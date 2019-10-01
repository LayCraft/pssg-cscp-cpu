import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';
import { RevenueSource } from 'src/app/core/models/revenue-source.class';

@Component({
	selector: 'app-program-budget',
	templateUrl: './program-budget.component.html',
	styleUrls: ['./program-budget.component.scss']
})
export class ProgramBudgetComponent implements OnInit {
	@Input() stepperElement: iStepperElement;
	currentTab: string;
	tabs: string[];

	revenueSources: RevenueSource[] = [];
	totalCash: number = 0;
	totalInKind: number = 0;
	totalGrand: number = 0;
	constructor(
	) {
		this.tabs = ['Program Revenue Information', 'Program Expense'];
		this.currentTab = this.tabs[0];
	}
	ngOnInit() {
		// TODO: go get the information to flow into this form from the lookup information in the stepper element
		this.revenueSources.push(new RevenueSource());
	}
	addRevenueSource() {
		this.revenueSources.push(new RevenueSource());
		this.calculateTotals();
	}
	removeRevenueSource() { }

	calculateTotals() {
		function reducer(prev: number = 0, curr: number = 0): number {
			return prev + curr;
		}
		// totalCash
		this.totalCash = this.revenueSources.map(rs => rs.cash).reduce(reducer) || 0;
		// totalInKind
		this.totalInKind = this.revenueSources.map(rs => rs.inKindContribution).reduce(reducer) || 0;
		this.totalGrand = this.totalCash + this.totalGrand;
	}
}

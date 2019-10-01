import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';
import { RevenueSource } from 'src/app/core/models/revenue-source.class';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

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
	removeRevenueSource(index: number): void {
		// splice is acting unpredictably so I'm doing it with a for loop
		const newArray = [];
		for (let i = 0; i < this.revenueSources.length; i++) {
			if (i !== index) {
				newArray.push(this.revenueSources[i]);
			}
		}
		this.revenueSources = newArray;
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
		// totalCash
		this.totalCash = this.revenueSources.map(rs => rs.cash).reduce(reducer) || 0;
		// totalInKind
		this.totalInKind = this.revenueSources.map(rs => rs.inKindContribution).reduce(reducer) || 0;
		this.totalGrand = this.revenueSources.map(rs => {
			let total = 0;
			if (typeof rs.cash === 'number') total += rs.cash;
			if (typeof rs.inKindContribution === 'number') total += rs.inKindContribution;
			return total;
		}).reduce(reducer) || 0;
	}
}

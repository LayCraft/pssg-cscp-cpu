import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';
import { RevenueSource, iRevenueSource } from 'src/app/core/models/revenue-source.class';

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

	constructor(
	) {
		this.tabs = ['Program Revenue Information', 'Program Expense'];
		this.currentTab = this.tabs[0];
	}
	ngOnInit() { }

}

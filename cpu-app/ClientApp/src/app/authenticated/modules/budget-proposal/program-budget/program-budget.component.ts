import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
	}
	removeRevenueSource() { }
}

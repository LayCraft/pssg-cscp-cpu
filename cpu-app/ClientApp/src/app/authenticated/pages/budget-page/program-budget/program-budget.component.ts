import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';


@Component({
	selector: 'app-program-budget',
	templateUrl: './program-budget.component.html',
	styleUrls: ['./program-budget.component.scss']
})
export class ProgramBudgetComponent implements OnInit {
	@Input() stepperElement: iStepperElement;
	currentTab: string;
	tabs: string[];

	constructor() {
		this.tabs = ['Program Revenue Information', 'Program Expense'];
		this.currentTab = this.tabs[0];
	}

	ngOnInit() {
	}

}

import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-program-budget',
	templateUrl: './program-budget.component.html',
	styleUrls: ['./program-budget.component.scss']
})
export class ProgramBudgetComponent implements OnInit {

	currentTab: string;
	tabs: string[];

	constructor() {
		this.tabs = ['Program Revenue Information', 'Program Expense'];
		this.currentTab = this.tabs[0];
	}

	ngOnInit() {
	}

}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { iProgramMeta, ProgramInformation, Hours } from 'src/app/core/models/program-information.class';
import { ContactInformation } from 'src/app/core/models/contact-information.class';

@Component({
	selector: 'app-program-budget',
	templateUrl: './program-budget.component.html',
	styleUrls: ['./program-budget.component.scss']
})
export class ProgramBudgetComponent implements OnInit {
	// is the contents of the form valid?
	@Input() programMeta: iProgramMeta;


	currentTab: string;
	tabs: string[];

	constructor() {
		this.tabs = ['Program Revenue Information', 'Program Expense'];
		this.currentTab = this.tabs[0];
	}

	ngOnInit() {
	}

}

import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/shared/components/icon-stepper/icon-stepper.component';

@Component({
	selector: 'app-program-budget-summary',
	templateUrl: './program-budget-summary.component.html',
	styleUrls: ['./program-budget-summary.component.scss']
})
export class ProgramBudgetSummaryComponent implements OnInit {
	@Input() stepperElement: iStepperElement;

	constructor() { }

	ngOnInit() {
	}

}

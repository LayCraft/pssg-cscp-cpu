import { Component, OnInit, Input } from '@angular/core';
import { iStepperElement } from 'src/app/core/services/stepper.service';

@Component({
	selector: 'app-program-overview',
	templateUrl: './program-overview.component.html',
	styleUrls: ['./program-overview.component.scss']
})
export class ProgramOverviewComponent implements OnInit {

	@Input() stepperElement: iStepperElement;

	constructor() { }

	ngOnInit() {
	}

}

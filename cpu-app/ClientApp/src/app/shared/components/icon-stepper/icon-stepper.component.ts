import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { StepperService, iStepperElement } from 'src/app/core/services/stepper.service';

@Component({
	selector: 'app-icon-stepper',
	templateUrl: './icon-stepper.component.html',
	styleUrls: ['./icon-stepper.component.scss']
})
export class IconStepperComponent implements OnInit {

	currentStepperElement: iStepperElement;
	// master list
	stepperElements: iStepperElement[] = [];
	// this object gives us keys to draw on to get classnames and messages
	levels: {} = {
		// message , colour class, icon class
		'untouched': ['', 'text-secondary', 'far fa-circle'],
		'incomplete': ['This form is unsaved but valid.', 'text-warning', 'fas fa-circle'],
		'invalid': ['This form is saved but invalid.', 'text-danger', 'fas fa-times-circle'],
		'complete': ['This form is saved and valid.', 'text-success', 'fas fa-check-circle'],
		'info': ['', 'text-info', 'fas fa-info-circle']
	}

	constructor(
		private stepperService: StepperService
	) { }

	ngOnInit() {
		// subscribe to all of the changes
		this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
		this.stepperService.stepperElements.subscribe(s => this.stepperElements = s);
	}

	onNavigate(id: string) {
		// set the internal state of this component
		this.stepperService.setCurrentStepperElement(id);
	}
}

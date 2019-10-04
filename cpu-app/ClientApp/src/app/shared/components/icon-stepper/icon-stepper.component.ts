import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { StepperService, iStepperElement } from 'src/app/core/services/stepper.service';

@Component({
	selector: 'app-icon-stepper',
	templateUrl: './icon-stepper.component.html',
	styleUrls: ['./icon-stepper.component.scss']
})
export class IconStepperComponent implements OnInit {

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

	uuidv4(): string {
		// replace x or y with randoms and other unique identifier stuff
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	constructor(
		private stepperService: StepperService
	) { }

	ngOnInit() {
		this.stepperService.stepperElements.subscribe(s => this.stepperElements = s);
	}

	onClick(navigateTo: iStepperElement) {
		// set the internal state of this component
		this.stepperService.setCurrentStepperElement(navigateTo.id);
	}
}

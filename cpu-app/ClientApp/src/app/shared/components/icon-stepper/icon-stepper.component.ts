import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
export interface iStepperElement {
	itemName: string; // This is the show name
	formState: string; // untouched incomplete invalid complete
	organizationId: string;
	contractId?: string;
	programId?: string;
	object?: object; // a generic place to save an object into the stepper
	uniqueIdentifier?: string;
}
@Component({
	selector: 'app-icon-stepper',
	templateUrl: './icon-stepper.component.html',
	styleUrls: ['./icon-stepper.component.scss']
})
export class IconStepperComponent implements OnInit, OnChanges {
	@Input() stepperElements: iStepperElement[];
	@Input() stepperElement: iStepperElement;
	@Output() stepperElementChange = new EventEmitter<iStepperElement>();

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

	constructor() { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges): void {
		// any time we have a new list of 
		this.stepperElements = this.stepperElements.map(s => {
			// assign a unique identifier if it is missing.
			if (!s.uniqueIdentifier) {
				s.uniqueIdentifier = this.uuidv4();
			}
			return s;
		});
	}

	onClick(navigateTo: iStepperElement) {
		// set the internal state of this component
		this.stepperElement = navigateTo;
		// emit the event for navigation
		this.stepperElementChange.emit(navigateTo);
	}
}

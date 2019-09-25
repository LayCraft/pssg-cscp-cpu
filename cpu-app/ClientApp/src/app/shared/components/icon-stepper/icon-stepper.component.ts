import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';

@Component({
	selector: 'app-icon-stepper',
	templateUrl: './icon-stepper.component.html',
	styleUrls: ['./icon-stepper.component.scss']
})
export class IconStepperComponent implements OnInit {
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


	// THIS IS AN EXAMPLE INPUT
	// @Input() stepperElements: iStepperElement[] = [
	// 	{
	// 		itemName: 'This is the zero form',
	// 		formState: 'untouched'
	// 	},
	// 	{
	// 		itemName: 'This is the first form',
	// 		formState: 'incomplete'
	// 	},
	// 	{
	// 		itemName: 'This is the second form',
	// 		formState: 'invalid'
	// 	},
	// 	{
	// 		itemName: 'This is the third form',
	// 		formState: 'complete'
	// 	}
	// ];

	constructor() { }

	ngOnInit() { }

	onClick(navigateTo: iStepperElement) {
		// set the internal state of this component
		this.stepperElement = navigateTo;
		// emit the event for navigation
		this.stepperElementChange.emit(navigateTo);
	}
}

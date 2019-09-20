import { Component, OnInit } from '@angular/core';

export interface iIconStepperElement {
	itemName: string; // This is the show name
	navigationName: string; // this is the key to route to or whatever
	level: string; // untouched incomplete invalid complete
}

@Component({
	selector: 'app-icon-stepper',
	templateUrl: './icon-stepper.component.html',
	styleUrls: ['./icon-stepper.component.scss']
})
export class IconStepperComponent implements OnInit {
	// this object gives us keys to draw on to get classnames and messages
	levels: {} = {
		// message , colour class, icon class
		'untouched': ['This form is untouched.', 'text-secondary', 'far fa-circle'],
		'incomplete': ['This form is unsaved but valid.', 'text-warning', 'fas fa-circle'],
		'invalid': ['This form is saved but invalid.', 'text-danger', 'fas fa-times-circle'],
		'complete': ['This form is saved and valid.', 'text-success', 'fas fa-check-circle'],
	}

	data: iIconStepperElement[] = [
		{
			itemName: 'This is the zero form',
			navigationName: 'untouched-item',
			level: 'untouched'
		},
		{
			itemName: 'This is the first form',
			navigationName: 'incomplete-item',
			level: 'incomplete'
		},
		{
			itemName: 'This is the second form',
			navigationName: 'invalid-item',
			level: 'invalid'
		},
		{
			itemName: 'This is the third form',
			navigationName: 'treefer-item',
			level: 'complete'
		}
	];
	// which one is active?
	activeNavigationName: string;

	constructor() { }

	ngOnInit() {
	}
	onClick(navigationName: string) {
		// emit the event for navigation
		this.activeNavigationName = navigationName;
	}
}

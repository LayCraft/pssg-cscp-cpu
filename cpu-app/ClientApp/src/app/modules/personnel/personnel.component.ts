import { Component, OnInit } from '@angular/core';
import { iStepperElement } from 'src/app/core/models/stepper-element';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/core/models/person.class';

@Component({
	selector: 'app-personnel',
	templateUrl: './personnel.component.html',
	styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
	contractId: string;
	organizationId: string;

	// used for the stepper component
	stepperElements: iStepperElement[];
	currentStepperElement: iStepperElement;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');
		this.contractId = this.route.snapshot.paramMap.get('contractId');

		// set the default top and bottom list
		this.constructDefaultstepperElements(this.organizationId);

	}

	isCurrentStepperElement(item: iStepperElement): boolean {
		if (item.itemName === this.currentStepperElement.itemName) {
			// names match? must be the same. Makes the assumption that all names are unique.
			return true;
		}
		return false;
	}
	constructDefaultstepperElements(organizationId: string) {
		// this is just a constructor
		// get the personnel list from Dynamics and shove it in here

		this.stepperElements = [
			{
				itemName: 'Alan',
				formState: 'info',
				organizationId,
				object: new Person()
			},
			{
				itemName: 'Betty',
				formState: 'info',
				organizationId,
				object: new Person()
			}
		];
		// save the first one
		this.currentStepperElement = this.stepperElements[0];
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/core/models/person.class';
import { iStepperElement } from 'src/app/shared/components/icon-stepper/icon-stepper.component';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
	selector: 'app-personnel',
	templateUrl: './personnel.component.html',
	styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
	// this is an organization level component
	organizationId: string;

	// used for the stepper component
	stepperElements: iStepperElement[] = [];
	currentStepperElement: iStepperElement;

	constructor(
		private route: ActivatedRoute,
		private personService: PersonService,
	) { }

	ngOnInit() {
		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');

		// set the default top and bottom list
		this.constructDefaultstepperElements(this.organizationId);
	}

	isCurrentStepperElement(item: iStepperElement): boolean {
		if (item.uniqueIdentifier === this.currentStepperElement.uniqueIdentifier) {
			// names match? must be the same. Makes the assumption that all names are unique.
			return true;
		}
		return false;
	}
	constructDefaultstepperElements(organizationId: string) {
		// this is just a constructor
		// get the personnel list from Dynamics and shove it in here
		this.personService.getPersons(organizationId).subscribe(persons => {
			persons.forEach(person => {
				const stepperElement: iStepperElement = {
					itemName: `${person.lastName}, ${person.firstName}`,
					formState: 'info',
					organizationId,
					object: new Person(person),
				}
				this.stepperElements.push(stepperElement);
			})
			// maybe there is no employees attached to the organization? Make one and add it.
			if (this.stepperElements.length === 0) {
				this.stepperElements.push({
					itemName: 'New Contact',
					formState: 'info',
					organizationId,
					object: new Person()
				});
			}
			// save the first one as the selected stepper element
			this.currentStepperElement = this.stepperElements[0];
		});

	}
	updateCurrent() {
		const firstName = this.currentStepperElement.object['firstName'];
		const lastName = this.currentStepperElement.object['lastName'];
		const fullName = `${lastName},  ${firstName}`;
		// make a current item
		this.currentStepperElement.itemName = fullName;
	}
}

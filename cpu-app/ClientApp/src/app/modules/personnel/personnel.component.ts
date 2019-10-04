import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person, iPerson } from 'src/app/core/models/person.class';
import { PersonService } from 'src/app/core/services/person.service';
import { NotificationQueueService } from 'src/app/core/services/notification-queue.service';
import { iStepperElement, StepperService } from 'src/app/core/services/stepper.service';

@Component({
	selector: 'app-personnel',
	templateUrl: './personnel.component.html',
	styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
	// this is an organization level component
	organizationId: string;
	reload = false;
	// used for the stepper component
	currentStepperElement: iStepperElement;
	stepperElements: iStepperElement[];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private personService: PersonService,
		private notificationQueueService: NotificationQueueService,
		private stepperService: StepperService,
	) { }

	ngOnInit() {
		// stay up to date with the stepper
		this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
		this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');

		// set the default top and bottom list
		this.constructDefaultstepperElements();
	}

	isCurrentStepperElement(item: iStepperElement): boolean {
		if (item.uniqueIdentifier === this.currentStepperElement.uniqueIdentifier) {
			// names match? must be the same. Makes the assumption that all names are unique.
			return true;
		}
		return false;
	}
	constructDefaultstepperElements(): void {
		// this is just a constructor
		// get the personnel list from Dynamics and shove it in here
		this.personService.getPersons('TODO: bork').subscribe(persons => {
			persons.forEach(person => {
				this.stepperService.addStepperElement(new Person(person), this.nameAssemble(person.firstName, person.middleName, person.lastName));
			})
		});
	}
	nameAssemble(first: string, middle: string, last: string): string {
		let build = '';
		if (first) build += first + ' ';
		if (middle) build += middle[0].toUpperCase() + ' ';
		if (last) build += last;
		return build;
	}
	// updateCurrent() {
	// 	// make a current item
	// 	this.currentStepperElement.itemName = this.nameAssemble(this.currentStepperElement.object['firstName'], this.currentStepperElement.object['middleName'], this.currentStepperElement.object['lastName']);
	// }
	save(exit?: boolean) {
		// make a person array to submit
		const cleanup = this.stepperElements.map(s => s.object as iPerson);
		this.personService.setPersons(this.organizationId, cleanup).subscribe(
			() => {
				// Go get the new people with whatever transformations happened.
				this.constructDefaultstepperElements();
				this.notificationQueueService.addNotification('Personnel Saved', 'success');
			},
			err => this.notificationQueueService.addNotification(err, 'danger')
		);
		if (exit) {
			// they chose to exit
			this.router.navigate(['/authenticated/dashboard']);
		}
	}
	add() { }
	onInput() {
		this.stepperService.setStepperElement(this.currentStepperElement.id, this.currentStepperElement);
	}
}

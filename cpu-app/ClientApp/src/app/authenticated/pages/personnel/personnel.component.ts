import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class PersonnelComponent implements OnInit, OnDestroy {
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
		// stay up to date with the stepper but reset old elements if they exist
		this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
		this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');
		// set the default top and bottom list
		this.constructDefaultstepperElements();
	}
	ngOnDestroy() {
		this.stepperService.reset();
	}
	constructDefaultstepperElements(): void {
		// this is just a constructor
		// get the personnel list from Dynamics and shove it in here
		this.personService.getPersons('TODO: bork').subscribe(persons => {
			this.stepperService.reset();
			persons.forEach(person => {
				this.stepperService.addStepperElement(new Person(person), this.nameAssemble(person.firstName, person.middleName, person.lastName), null, 'person');
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
	add() {
		const element: iPerson = {
			typeOfEmployee: '',
			address: null,
			annualSalary: null,
			baseHourlyWage: null,
			benefits: null,
			email: '',
			fax: '',
			firstName: '',
			hoursWorkedPerWeek: null,
			lastName: '',
			middleName: '',
			personId: '',
			phone: '',
			title: '',
			fundedFromVscp: null,
		};
		this.stepperService.addStepperElement(element, 'New Person', null, 'person');
	}
	remove(id: string = this.currentStepperElement.id) {
		// remove the element
		this.stepperService.removeStepperElement(id);
	}
	onChange(element: iStepperElement) {
		element.itemName = this.nameAssemble(element.object['firstName'], element.object['middleName'], element.object['lastName'])
		// loop back to shove the new form into the service
		this.stepperService.setStepperElement(element);
	}
}

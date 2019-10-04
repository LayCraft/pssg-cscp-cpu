import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { uuidv4 } from '../constants/uuidv4';
export interface iStepperElement {
	itemName: string; // This is the show name
	formState: string; // untouched incomplete invalid complete
	id?: string; // optional because it may not be set yet
	object?: object; // a generic place to save an object into the stepper

	organizationId?: string;
	contractId?: string;
	programId?: string;
	uniqueIdentifier?: string;
}
@Injectable({
	providedIn: 'root'
})
export class StepperService {

	constructor() { }
	logging = false;// logging on or off? Just for development
	currentStepperElement: BehaviorSubject<iStepperElement> = new BehaviorSubject<iStepperElement>(null);
	stepperElements: BehaviorSubject<iStepperElement[]> = new BehaviorSubject<iStepperElement[]>([]);

	formStates: string[] = ['untouched', 'incomplete', 'invalid', 'complete'];

	addStepperElement(object: object, itemName: string, formState: string = this.formStates[0]): iStepperElement {
		if (this.logging) { console.log('addStepperElement()') }
		// collect the current stepper elements
		const stepperElements: iStepperElement[] = this.stepperElements.getValue();
		// put the elements into the stepper
		const stepperElement: iStepperElement = { itemName, formState, object, id: uuidv4() };
		// add the new one into the 
		stepperElements.push(stepperElement);
		this.stepperElements.next(stepperElements);

		//set the current stepper element to the new record so the user can start editing it immediately
		this.currentStepperElement.next(stepperElement);

		// be sure one is selected
		this.checkForSelected();
		// return
		return stepperElement;
	}
	removeStepperElement(id: string): void {
		if (this.logging) { console.log('removeStepperElement()') }

		// collect the current stepper elements
		const stepperElements: iStepperElement[] = this.stepperElements.getValue().filter(e => {
			if (e.id === id) {
				// do not return the matching item
				return false;
			} else {
				// return all other items
				return true;
			}
		});
		if (this.currentStepperElement.getValue().id === id) { }
		// replace the behaviourSubject
		this.stepperElements.next(stepperElements);
		this.checkForSelected();
	}
	getStepperElement(id: string): iStepperElement {
		if (this.logging) { console.log('getStepperElement()') }
		// find and return the element
		const elements = this.stepperElements.getValue();
		// for is used so that 
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].id === id) {
				// this item matches
				return elements[i];
			};
			if (i === elements.length - 1) {
				// this is the last item in the list and didn't match
				return null;
			}
		}
	}
	setStepperElement(element: iStepperElement): void {
		if (this.logging) { console.log('setStepperElement()') }
		// collect the elements
		const stepperElements: iStepperElement[] = this.stepperElements.getValue().map(s => {
			// if the id matches
			if (s.id === element.id) {
				// replace the element with the one supplied
				s = element;
			}
			return s;
		});
		// assign the stepper elements back to the behavioursubject
		this.stepperElements.next(stepperElements);
		this.checkForSelected();
	}
	setStepperElementProperty(id: string, property: string, value: any): void {
		if (this.logging) { console.log('setStepperElementProperty()') }

		// collect the element
		const element = this.getStepperElement(id);
		// set the property
		element[property] = value;
		// set the stepper element to our newly updated value
		this.setStepperElement(element);
	}
	setFormState(id: string, formState: string) {
		if (this.logging) { console.log('setFormState()') }

		// check that formstate exists
		if (this.formStates.indexOf(formState) !== -1) {
			// set the formstate
			this.setStepperElementProperty(id, 'formState', formState);
		}
	}
	setCurrentStepperElement(id: string) {
		if (this.logging) { console.log('setCurrentStepperElement()') }

		const element = this.getStepperElement(id);
		if (this.logging) { console.log('Collecting element. aoiuf', element) }

		// set it to the current
		this.currentStepperElement.next(element);
		this.checkForSelected();
	}
	initializeStepperElements(stepperElements: iStepperElement[]): void {
		if (this.logging) { console.log('initializeStepperElements()') }

		const newStepperElements: iStepperElement[] = stepperElements.map(s => {
			// missing a UUID? Add one
			if (!s['id']) {
				// add uuidv4 if none supplied. This ID isn't supplied by the backend.
				s.id = uuidv4();
			}
			return s;
		})
		// save the stepper elements
		this.stepperElements.next(newStepperElements);
		this.checkForSelected();
	}
	reset() {
		this.currentStepperElement.next(null);
		this.stepperElements.next([]);
	}
	private checkForSelected() {
		if (this.logging) { console.log('checkForSelected()') }

		// this is a validity check to be sure the service isn't wrangled into a weird state.
		// We want this service to stay in a perpetually valid state because it is the source of truth for the stepper.

		const c = this.currentStepperElement.getValue();
		const se = this.stepperElements.getValue();
		if (c && !se.length) {
			// currently selected item and no selectable items
			// null out the currently selected item since it no longer exists
			this.currentStepperElement.next(null);
		} else if (!c && se.length) {
			// no currently selected and selectable items
			// pick the first element in the list.
			this.currentStepperElement.next(se[0]);
		} else if (c && se.length) {
			// currently selected item and non null length
			// the item should be in the list. But it may not be if it was deleted from under us.
			// there is still length so we set the item null and do this function over again and it gets fixed in the (!c && se.length).
		}
		else if (!c && !se.length) {
			// nothing loaded? Fine. do nothing
			// be sure to instantiate the behaviour subjects to the right states maybe?
		}
	}
}

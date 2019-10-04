import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

	currentStepperElement: BehaviorSubject<iStepperElement> = new BehaviorSubject<iStepperElement>(null);
	stepperElements: BehaviorSubject<iStepperElement[]> = new BehaviorSubject<iStepperElement[]>([]);

	formStates: string[] = ['untouched', 'incomplete', 'invalid', 'complete'];

	uuidv4(): string {
		// generate a unique identifier
		// replace x or y with randoms and other unique identifier stuff
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	addStepperElement(object: object, itemName: string, formState: string = this.formStates[0]): void {
		// collect the current stepper elements
		const stepperElements: iStepperElement[] = this.stepperElements.getValue();
		// put the elements into the stepper
		const stepperElement: iStepperElement = { itemName, formState, object, id: this.uuidv4() };
		// add the new one into the 
		stepperElements.push(stepperElement);
		this.stepperElements.next(stepperElements);
	}
	removeStepperElement(id: string): void {
		// collect the current stepper elements
		const stepperElements: iStepperElement[] = this.stepperElements.getValue().filter(e => {
			if (e.id === id) {
				return true;
			} else {
				return false;
			}
		});
		// replace the behaviourSubject
		this.stepperElements.next(stepperElements);
	}
	getStepperElement(id: string): iStepperElement {
		// find and return the element
		this.stepperElements.getValue().forEach(e => {
			if (e.id === id) {
				return e;
			}
		});
		// nothing was found in the foreach? return null
		return null;
	}
	setStepperElement(id: string, element: iStepperElement): void {
		// collect the elements
		const stepperElements: iStepperElement[] = this.stepperElements.getValue().map(s => {
			// if the id matches
			if (s.id === id) {
				// replace the element with the one supplied
				s = element;
			}
			return s;
		});
		// assign the stepper elements back to the behavioursubject
		this.stepperElements.next(stepperElements);
	}
	setStepperElementProperty(id: string, property: string, value: any): void {
		// collect the element
		const element = this.getStepperElement(id);
		// set the property
		element[property] = value;
		// set the stepper element to our newly updated value
		this.setStepperElement(id, element);
	}
	setFormState(id: string, formState: string) {
		// check that formstate exists
		if (this.formStates.indexOf(formState) !== -1) {
			// set the formstate
			this.setStepperElementProperty(id, 'formState', formState);
		}
	}
	setCurrentStepperElement(id: string) {
		const element = this.getStepperElement(id);
		// set it to the current
		this.currentStepperElement.next(element);
	}
	initializeStepperElements(stepperElements: iStepperElement[]): void {
		const newStepperElements: iStepperElement[] = stepperElements.map(s => {
			// missing a UUID? Add one
			if (!s['id']) {
				// add uuidv4 if none supplied. This ID isn't supplied by the backend.
				s.id = this.uuidv4();
			}
			return s;
		})
		// save the stepper elements
		this.stepperElements.next(newStepperElements);
		// if there are elements set it to the first one 
		if (newStepperElements.length > 0) {
			// set it to the first stepper element
			this.currentStepperElement.next(newStepperElements[0]);
		}
	}

}

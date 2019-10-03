export interface iStepperElement {
	itemName: string; // This is the show name
	formState: string; // untouched incomplete invalid complete
	organizationId: string;
	contractId?: string;
	programId?: string;
	object?: object; // a generic place to save an object into the stepper
	uniqueIdentifier: string;
}
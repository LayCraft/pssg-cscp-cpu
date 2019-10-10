import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { iPerson } from 'src/app/core/models/person.class';

export interface iSignature {
	signer: iPerson;
	signature: any; // TODO: not sure how the signature collection part works yet
	termsConfirmation: boolean;
}

@Component({
	selector: 'app-program-authorizer',
	templateUrl: './program-authorizer.component.html',
	styleUrls: ['./program-authorizer.component.scss']
})
export class ProgramAuthorizerComponent implements OnInit {
	@Input() signature: iSignature;
	@Output() signatureChange = new EventEmitter<iSignature>();

	terms: [string, boolean][] = [
		['The organization has late or outstanding reports.', false],
		['The organization fails to adhere Employment Standards Act of BC.', false],
		['The organization fails to adhere to the BC Human Rights Code.', false],
		['The organization fails to comply with the Worker\'s Compensation Act (WorkSafe BC).', false],
		['The organization does not provide or secure adequate commercial general liability insurance.', false],
		['The organization fails to comply with privacy legislation.', false],
		['If any part of the application is discovered to be innacurate.', false],
		['I understand that the Application Program for Victim Services and Crime Prevention Division may notify provincial authorities that I have submitted an application.', false],
		['I have read and understood the above information.', false],

	]
	constructor() { }

	ngOnInit() {
	}
	get state() {
		// are all flags true?
		return this.terms.map(term => term[1]).reduce((prev: boolean, curr: boolean) => prev && curr);
	}
	onInput() {
		// todo this should emit the form not just a value
		if (this.state) {
			this.signatureChange.emit(this.signature);
		};
	}
}

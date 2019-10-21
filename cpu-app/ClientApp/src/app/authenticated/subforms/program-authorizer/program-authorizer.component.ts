import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { iPerson } from '../../../core/models/person.class';

export interface iSignature {
  signer: iPerson;
  signature: any; // TODO: not sure how the signature collection part works yet
  termsConfirmation: boolean;
}
@Component({
  selector: 'app-program-authorizer',
  templateUrl: './program-authorizer.component.html',
  styleUrls: ['./program-authorizer.component.css']
})
export class ProgramAuthorizerComponent implements OnInit {
  @Input() signature: iSignature;
  @Output() signatureChange = new EventEmitter<iSignature>();

  terms: [string, boolean][] = [
    ['Termination may occur if the organization has late or outstanding reports.', false],
    ['Termination may occur if the organization fails to adhere Employment Standards Act of BC.', false],
    ['Termination may occur if the organization fails to adhere to the BC Human Rights Code.', false],
    ['Termination may occur if the organization fails to comply with the Worker\'s Compensation Act (WorkSafe BC).', false],
    ['Termination may occur if the organization does not provide or secure adequate commercial general liability insurance.', false],
    ['Termination may occur if the organization fails to comply with privacy legislation.', false],
    ['Termination may occur if any part of the application is found to be innacurate.', false],
    ['I understand that the Application Program for Victim Services and Crime Prevention Division may notify provincial authorities that I have submitted an application.', false],
    ['I have the authority to submit this application on behalf of this organization.', false],
    ['I have read, understood, and certify that the information being submitted is accurate to the best of my knowledge.', false],
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

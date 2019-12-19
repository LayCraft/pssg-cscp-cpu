import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { iPerson, Person } from '../../../core/models/person.class';
import { StateService } from '../../../core/services/state.service';

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
    ['I understand that the Application Program for Victim Services and Crime Prevention Division may notify the above authorities that I have submitted an application', false],
    ['I have read and understood the above information', false]
    // ['Termination may occur if the organization has late or outstanding reports.', false],
    // ['Termination may occur if the organization fails to adhere Employment Standards Act of BC.', false],
    // ['Termination may occur if the organization fails to adhere to the BC Human Rights Code.', false],
    // ['Termination may occur if the organization fails to comply with the Worker\'s Compensation Act (WorkSafe BC).', false],
    // ['Termination may occur if the organization does not provide or secure adequate commercial general liability insurance.', false],
    // ['Termination may occur if the organization fails to comply with privacy legislation.', false],
    // ['Termination may occur if any part of the application is found to be innacurate.', false],
    // ['I understand that the Application Program for Victim Services and Crime Prevention Division may notify provincial authorities that I have submitted an application.', false],
    // ['I have the authority to submit this application on behalf of this organization.', false],
    // ['I have read, understood, and certify that the information being submitted is accurate to the best of my knowledge.', false],
  ]
  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    if (!this.signature) {
      // set the signature from the application state if not set
      this.signature = {
        signer: new Person(this.stateService.currentUser.getValue()),
        signature: null,
        termsConfirmation: false,
      }
    }
  }
  get state() {
    // are all flags true?
    return this.terms.map(term => term[1]).reduce((prev: boolean, curr: boolean) => prev && curr);
  }
  onInput() {
    // todo this should emit the form not just a value
    if (this.state) {
      // set the terms confirmation on the signature
      this.signature.termsConfirmation = true;
      // emit the signature
      this.signatureChange.emit(this.signature);
    };
  }
}

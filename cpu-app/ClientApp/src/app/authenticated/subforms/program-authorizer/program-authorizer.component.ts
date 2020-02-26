import * as moment from 'moment';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Person } from '../../../core/models/person.class';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { StateService } from '../../../core/services/state.service';
import { iPerson } from '../../../core/models/person.interface';


export interface iSignature {
  signer: iPerson;
  signature?: any;
  signatureDate?: string;
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
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signatureImage: any;
  wasSigned: boolean = false;
  signatureData: string;
  signingDate: string;
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

  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 0.3,
    'maxWidth': 2.5,
    'canvasWidth': 600,
    'canvasHeight': 200,
  };
  clearSignature() {
    this.wasSigned = false;
    this.signatureData = null;
    this.signaturePad.clear();
    this.signature.signature = null;
    this.signature.signatureDate = null;
  }

  acceptSignature() {
    if (this.wasSigned) {
      this.signature.signature = this.signaturePad.toDataURL();
      this.signature.signatureDate = new Date().toISOString().split('T')[0];
    }
  }
  drawStart() {
    this.wasSigned = true;
  }
}

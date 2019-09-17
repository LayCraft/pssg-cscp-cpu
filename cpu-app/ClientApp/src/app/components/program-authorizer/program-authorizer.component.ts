import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-program-authorizer',
  templateUrl: './program-authorizer.component.html',
  styleUrls: ['./program-authorizer.component.scss']
})
export class ProgramAuthorizerComponent implements OnInit {
  @Output() unlock = new EventEmitter<boolean>();

  terms: [string, boolean][] = [
    ['The organization has late or outstanding reports.', false],
    ['The organization fails to adhere Employment Standards Act of BC.', false],
    ['The organization fails to adhere to the BC Human Rights Code.', false],
    ['The organization fails to comply with the Worker\'s Compensation Act (WorkSafe BC).', false],
    ['The organization does not provide or secure adequate commercial general liability insurance.', false],
    ['The organization fails to comply with privacy legislation.', false],
    ['If any part of the application is discovered to be innacurate.', false],
  ]
  constructor() { }

  ngOnInit() {
  }
  get state() {
    // are all flags true?
    return this.terms.map(t => t[1]).reduce((prev: boolean, curr: boolean) => prev && curr);
  }
  unlockIt(state: boolean) {
    // emit the state of all fo the checkboxes
    this.unlock.emit(state);
  }
}

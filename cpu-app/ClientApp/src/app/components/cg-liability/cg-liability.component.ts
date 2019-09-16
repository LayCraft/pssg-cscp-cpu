import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cg-liability',
  templateUrl: './cg-liability.component.html',
  styleUrls: ['./cg-liability.component.scss']
})
export class CgLiabilityComponent implements OnInit {
  @Input() cgLiability: string;
  @Output() cgLiabilityChange = new EventEmitter<string>();
  @Output() valid = new EventEmitter<boolean>();
  cgLiabilityValue: string;

  constructor() { }
  ngOnInit() {
    this.cgLiabilityValue = this.cgLiability || '';
  }
  onInput() {
    // required validity.
    this.cgLiabilityValue ? this.valid.emit(true) : this.valid.emit(false);
    this.cgLiabilityChange.emit(this.cgLiabilityValue);
  }
}

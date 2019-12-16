import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormHelper } from '../../../core/form-helper';
import { iAddress, Address } from '../../../core/models/address.class';

@Component({
  selector: 'app-address2',
  templateUrl: './address2.component.html',
  styleUrls: ['./address2.component.css']
})
export class Address2Component implements OnInit {

  public formHelper = new FormHelper();
  @Input() address: iAddress;
  @Output() addressChange = new EventEmitter<iAddress>();

  constructor() { }

  ngOnInit() {
    this.address = new Address();
  }
  onChange() {
    this.addressChange.emit(this.address);
  }
}

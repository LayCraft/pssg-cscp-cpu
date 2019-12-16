import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormHelper } from '../../../core/form-helper';
import { iAddress, Address } from '../../../core/models/address.class';
import { COUNTRIES_ADDRESS_2 } from '../../../core/constants/country-list';

@Component({
  selector: 'app-address2',
  templateUrl: './address2.component.html',
  styleUrls: ['./address2.component.css']
})
export class Address2Component implements OnInit {

  public formHelper = new FormHelper();
  @Input() address: iAddress;
  @Output() addressChange = new EventEmitter<iAddress>();

  countries;
  country;

  constructor() {
    this.countries = COUNTRIES_ADDRESS_2;
    this.country = this.address && this.address.country ? COUNTRIES_ADDRESS_2[this.address.country] : COUNTRIES_ADDRESS_2['Canada'];
  }

  ngOnInit() {
    this.address = this.address ? new Address(this.address) : new Address();
  }
  onChange() {
    this.addressChange.emit(this.address);
  }
}

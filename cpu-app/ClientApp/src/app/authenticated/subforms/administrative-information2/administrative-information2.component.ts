import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iAdministrativeInformation } from '../../../core/models/administrative-information.interface';

@Component({
  selector: 'app-administrative-information2',
  templateUrl: './administrative-information2.component.html',
  styleUrls: ['./administrative-information2.component.css']
})
export class AdministrativeInformation2Component implements OnInit {
  // input a contact information properties to create this form
  @Input() administrativeInformation: iAdministrativeInformation;
  // output a contact on change
  @Output() administrativeInformationChange = new EventEmitter<iAdministrativeInformation>();

  constructor() { }

  ngOnInit() {
  }

}

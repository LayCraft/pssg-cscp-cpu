import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-administrative-information',
  templateUrl: './administrative-information.component.html',
  styleUrls: ['./administrative-information.component.scss']
})
export class AdministrativeInformationComponent implements OnInit {
  // a viewchild to check the validity of the template form
  @ViewChild(NgForm) aiForm;
  // input a contact information properties to create this form
  @Input() administrativeInformation: any;
  // output a contact on change
  @Output() administrativeInformationChange = new EventEmitter<any>();
  // is the contents of the form valid?
  @Output() valid = new EventEmitter<boolean>();

  administrativeInfoForm;
  constructor() { }

  ngOnInit() {
  }
  onInput() {
    // is this valid? Emit it boolean
    this.valid.emit(this.aiForm.valid);
    // emit the form
    this.administrativeInformationChange.emit(this.administrativeInfoForm);
  }
}

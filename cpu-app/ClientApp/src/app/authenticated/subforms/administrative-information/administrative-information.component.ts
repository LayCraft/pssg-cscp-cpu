import { AbstractControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { TransmogrifierProgramApplication } from '../../../core/models/transmogrifier-program-application.class';

@Component({
  selector: 'app-administrative-information',
  templateUrl: './administrative-information.component.html',
  styleUrls: ['./administrative-information.component.css']
})
export class AdministrativeInformationComponent implements OnInit {
  // input a contact information properties to create this form
  @Input() transmogrifierProgramApplication: TransmogrifierProgramApplication;
  // output a contact on change
  @Output() transmogrifierProgramApplicationChange = new EventEmitter<TransmogrifierProgramApplication>();

  subcontractedStaffObj: any = { persons: [], removedPersons: [] };

  constructor() { }
  ngOnInit() {
    this.subcontractedStaffObj.persons = this.transmogrifierProgramApplication.administrativeInformation.staffSubcontractedPersons;
    this.subcontractedStaffObj.removedPersons = [];
  }

  // form helpers. Validity hints and hide/show toggles
  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }

  onInput() {
    // emit the form
    this.transmogrifierProgramApplicationChange.emit(this.transmogrifierProgramApplication);
  }

  onSubcontractedStaffChange(personsObj: any) {
    this.transmogrifierProgramApplication.administrativeInformation.staffSubcontractedPersons = personsObj.persons;
    // this.programApplication.removedStaff = personsObj.removedPersons;
    this.onInput();

  }
}

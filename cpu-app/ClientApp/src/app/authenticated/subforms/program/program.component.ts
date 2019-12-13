import { AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iProgramApplication, ProgramApplication } from '../../../core/models/program-application.class';
import { iPerson } from '../../../core/models/person.class';
import { Hours, iHours } from '../../../core/models/hours.class';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  @Input() programApplication: iProgramApplication;
  @Output() programApplicationChange = new EventEmitter<iProgramApplication>();
  required = false;
  // the form model
  differentProgramContact: boolean = false;
  pa: ProgramApplication;
  currentTab: string;
  tabs: string[];
  persons: iPerson[] = [];

  constructor(
    private stateService: StateService
  ) {
    this.tabs = ['Contact Information', 'Delivery Information',
      // 'Reporting Requirements'
    ];
    this.currentTab = this.tabs[0];
  }

  ngOnInit() {
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.persons = m.persons;
    });
    this.pa = new ProgramApplication(this.programApplication);
    this.addOperationHours();
    this.addStandbyHours();
    this.onInput();
  }

  // form helpers. Validity hints and hide/show toggles
  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }
  onInput() {
    this.programApplicationChange.emit(this.programApplication);
  }

  showProgramContact() {
    // Whether turned off or on we wipe out the contact information
    this.differentProgramContact = !this.differentProgramContact;
  }

  addOperationHours() {
    this.programApplication.operationHours.push(new Hours());
  }
  addStandbyHours() {
    this.programApplication.standbyHours.push(new Hours());
  }
  removeOperationHours(i: number) {
    this.programApplication.operationHours = this.programApplication.operationHours.filter((hours: iHours, j: number) => i !== j);
  }
  removeStandbyHours(i: number) {
    this.programApplication.standbyHours = this.programApplication.standbyHours.filter((hours: iHours, j: number) => i !== j);
  }

  onProgramContactChange(event: iPerson) {
    this.programApplication.programContact = event;
    this.onInput();
  }
  onPaidStaffChange(event: iPerson[]) {
    this.programApplication.additionalStaff = event;
    this.onInput();

  }
  onProgramStaffChange(event: iPerson[]) {
    this.programApplication.additionalStaff = event;
    this.onInput();

  }
  setCurrentTab(tab) {
    this.currentTab = tab;
  }
}

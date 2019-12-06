import { AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iProgramApplication, ProgramApplication } from '../../../core/models/program-application.class';
import { iPerson } from '../../../core/models/person.class';
import { Hours } from '../../../core/models/hours.class';
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
    this.addOperationHours();
    this.addStandbyHours();
    this.onInput();
    // initialize the program information if it is supplied else make a new object
    // this.programInformationService.getProgramInformation(this.programMeta.organizationId, this.programMeta.programId).subscribe((p: iProgramInformation) => {
    //   this.programInformationForm = new ProgramInformation(p);
    // });
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

  onProgramContactChange(event: iPerson) {
    this.programApplication.programContact = event;
  }
  onPaidStaffChange(event: iPerson[]) {
    this.programApplication.additionalStaff = event;
  }
  onProgramStaffChange(event: iPerson[]) {
    this.programApplication.additionalStaff = event;
  }
  setCurrentTab(tab) {
    this.currentTab = tab;
  }
}

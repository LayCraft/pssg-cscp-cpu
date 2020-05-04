import { AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormHelper } from '../../../core/form-helper';
import { Hours } from '../../../core/models/hours.class';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { iContactInformation } from '../../../core/models/contact-information.interface';
import { iPerson } from '../../../core/models/person.interface';
import { iProgramApplication } from '../../../core/models/program-application.interface';
import { EMAIL, PHONE_NUMBER } from '../../../core/constants/regex.constants';
import { iHours } from '../../../core/models/hours.interface';
import { perTypeDict } from '../../../core/constants/per-type';
import * as _ from 'lodash';

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
  // currentTab: string;
  differentProgramContact: boolean = false;
  persons: iPerson[] = [];
  trans: Transmogrifier;
  programContactInformation: iContactInformation;
  tabs: string[];
  // helpers for setting form state
  public formHelper = new FormHelper();
  emailRegex: RegExp;
  phoneRegex: RegExp;

  perType: string = "Week";
  //combined object of persons and removedPersons to send to child component
  personsObj: any = { persons: [], removedPersons: [] };

  constructor(
    private stateService: StateService
  ) {
    this.tabs = ['Contact Information', 'Delivery Information'];
    this.emailRegex = EMAIL;
    this.phoneRegex = PHONE_NUMBER;
  }

  ngOnInit() {
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;
      this.persons = m.persons;
    });
    this.onInput();
    this.personsObj.persons = this.programApplication.additionalStaff;
    this.personsObj.removedPersons = this.programApplication.removedStaff;
    this.perType = perTypeDict[this.programApplication.perType];

    // this.programApplication.currentTab = this.tabs[0];
  }

  // form helpers. Validity hints and hide/show toggles
  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }
  onInput() {
    // assemble both parts of the form into one object
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
    if (this.programApplication.operationHours[i].hoursId) {
      this.programApplication.operationHours[i].isActive = false;
    }
    else {
      this.programApplication.operationHours = this.programApplication.operationHours.filter((hours: iHours, j: number) => i !== j);
    }
  }
  removeStandbyHours(i: number) {
    if (this.programApplication.standbyHours[i].hoursId) {
      this.programApplication.standbyHours[i].isActive = false;
    }
    else {
      this.programApplication.standbyHours = this.programApplication.standbyHours.filter((hours: iHours, j: number) => i !== j);
    }
  }

  onProgramContactChange(event: iPerson) {
    this.programApplication.programContact = event;
    if (this.programApplication.mailingAddressSameAsProgramContact) {
      let addressCopy = _.cloneDeep(this.programApplication.programContact.address)
      this.programApplication.mainAddress = addressCopy;
    }
    this.onInput();
  }
  onPaidStaffChange(event: iPerson[]) {
    this.programApplication.additionalStaff = event;
    this.onInput();

  }
  onProgramStaffChange(personsObj: any) {
    this.programApplication.additionalStaff = personsObj.persons;
    this.programApplication.removedStaff = personsObj.removedPersons;
    this.onInput();

  }
  setCurrentTab(tab) {
    this.programApplication.currentTab = tab;
  }
  setAddressSameAsAgency(person: iPerson) {
    let addressCopy = _.cloneDeep(this.trans.contactInformation.mainAddress)
    person.address = addressCopy;
  }
  setMailingAddressSameAsProgramContact() {
    if (!this.programApplication.mailingAddressSameAsProgramContact) {
      let addressCopy = _.cloneDeep(this.programApplication.programContact.address)
      this.programApplication.mailingAddress = addressCopy;
    }
  }
}

import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddPersonDialog } from '../../dialogs/add-person/add-person.dialog';
import { ProgramApplicationComponent } from '../../program-application/program-application.component';
import { Address } from '../../../core/models/address.class';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit, OnDestroy {
  @Input() programApplication: iProgramApplication;
  @Input() isDisabled: boolean = false;
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
  subContractedPersonsObj: any = { persons: [], removedPersons: [] };
  private stateSubscription: Subscription;

  public programFormGroup: FormGroup;

  constructor(
    private stateService: StateService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.tabs = ['Contact Information', 'Delivery Information'];
    this.emailRegex = EMAIL;
    this.phoneRegex = PHONE_NUMBER;
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  ngOnInit() {
    // this.programFormGroup = new FormGroup({});
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;
      this.persons = m.persons;
    });
    this.onInput();
    this.personsObj.persons = this.programApplication.additionalStaff;
    this.personsObj.removedPersons = this.programApplication.removedStaff;
    this.subContractedPersonsObj.persons = this.programApplication.subContractedStaff;
    this.subContractedPersonsObj.removedPersons = this.programApplication.removedSubContractedStaff;
    this.perType = perTypeDict[this.programApplication.perType];

    this.programFormGroup = this.fb.group({
      'scheduledHours': new FormControl({ disabled: this.isDisabled, value: this.programApplication.scheduledHours }, Validators.min(this.programApplication.numberOfHours))
    });
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

  onPaidStaffChange(event: iPerson[]) {
    this.programApplication.additionalStaff = event;
    this.onInput();

  }
  onProgramStaffChange(personsObj: any) {
    this.programApplication.additionalStaff = personsObj.persons;
    this.programApplication.removedStaff = personsObj.removedPersons;
    this.onInput();

  }
  onSubContractedStaffChange(personsObj: any) {
    this.programApplication.subContractedStaff = personsObj.persons;
    this.programApplication.removedSubContractedStaff = personsObj.removedPersons;
    this.onInput();

  }
  setCurrentTab(tab) {
    this.programApplication.currentTab = tab;
  }
  showAddProgramStaffDialog() {
    let dialogRef = this.dialog.open(AddPersonDialog, {
      autoFocus: false,
      width: '80vw',
      data: { programApplication: this.programApplication }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stateService.refresh();
      }
    });
  }
  setAddressSameAsAgency(person: iPerson) {
    let addressCopy = _.cloneDeep(this.trans.contactInformation.mainAddress)
    person.address = addressCopy;
  }
  setMailingAddressSameAsMainAddress() {
    if (!this.programApplication.mailingAddressSameAsMainAddress) {
      // let addressCopy = _.cloneDeep(this.programApplication.mainAddress)
      // this.programApplication.mailingAddress = addressCopy;
      this.programApplication.mailingAddress = this.programApplication.mainAddress;
    }
    else {
      let addressCopy = _.cloneDeep(this.programApplication.mailingAddress);
      this.programApplication.mailingAddress = new Address(); //addressCopy;
    }
  }
}

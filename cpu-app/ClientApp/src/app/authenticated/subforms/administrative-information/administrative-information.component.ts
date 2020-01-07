import { iPerson } from '../../../core/models/person.class';
import { iAdministrativeInformation } from '../../../core/models/administrative-information.interface';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { StateService } from '../../../core/services/state.service';
import { PersonService } from '../../../core/services/person.service';
import { NgForm, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { AdministrativeInformation } from '../../../core/models/administrative-information.class';

@Component({
  selector: 'app-administrative-information',
  templateUrl: './administrative-information.component.html',
  styleUrls: ['./administrative-information.component.css']
})
export class AdministrativeInformationComponent implements OnInit {
  // a viewchild to check the validity of the template form
  @ViewChild(NgForm) aiForm;
  // input a contact information properties to create this form
  @Input() administrativeInformation: iAdministrativeInformation;
  // output a contact on change
  @Output() administrativeInformationChange = new EventEmitter<AdministrativeInformation>();
  // is the contents of the form valid?
  @Output() valid = new EventEmitter<boolean>();
  required = false;
  // form model
  administrativeInformationForm: AdministrativeInformation;

  persons: iPerson[] = [];

  constructor(
    private personService: PersonService,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    // collect the persons for the organization
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.persons = m.persons;
    });
    // initialize the contact information if it is supplied else make a new object
    this.administrativeInformation ? this.administrativeInformationForm = new AdministrativeInformation(this.administrativeInformation) : new AdministrativeInformation();
    // now that the form is initialized we emit it to send the validity to the parent. Otherwise we have to wait for the user to change something.
    this.onInput();
  }

  // if the supplied information changes reinitialize it into the form
  ngOnChange(change: iAdministrativeInformation) {
    this.administrativeInformationForm = new AdministrativeInformation(change);
    // now that the form is initialized we emit it to send the validity to the parent. Otherwise we have to wait for the user to change something.
    this.onInput();
  }
  // form helpers. Validity hints and hide/show toggles
  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }

  onInput() {
    // is this valid? Emit it boolean
    this.valid.emit(this.aiForm.valid);
    // emit the form
    this.administrativeInformationChange.emit(this.administrativeInformationForm);
  }

  changeStaffUnionized() {
    // if the staff is unionized we show a form
    // if not we remove the information from the form
    if (!this.administrativeInformationForm.staffUnionized) {
      this.administrativeInformationForm.staffUnion = null;
    }
  }
  onSubcontractedStaffChange(event: iPerson[]) {
    // assign the array to the form
    this.administrativeInformationForm.staffSubcontractedPersons = event;
  }
}

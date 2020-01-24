import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactInformation } from '../../../core/models/contact-information.class';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Person } from '../../../core/models/person.class';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { iContactInformation } from '../../../core/models/contact-information.interface';
import { iPerson } from '../../../core/models/person.interface';

@Component({
  selector: 'app-program-contact-information',
  templateUrl: './program-contact-information.component.html',
  styleUrls: ['./program-contact-information.component.css']
})
export class ProgramContactInformationComponent implements OnInit {

  // this collects all of the information for all programs so we are actually collecting parent data
  // we should patch it into the data on change
  @Input() contactInformation: iContactInformation;
  @Output() contactInformationChange = new EventEmitter<iContactInformation>();
  @Input() required = true;
  @Input() title = 'Primary Program Contact Information';

  // formHelper = new FormHelper();
  contactInformationForm: FormGroup;
  persons: Person[] = [];
  hasBoardOfDirectors: boolean = false;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.hasBoardOfDirectors = this.contactInformation.boardContact ? true : false;
    // create a new contact information form
    this.contactInformationForm = new FormGroup({
      'contactInformation': new FormControl('', Validators.required)
    });
    this.stateService.main.subscribe((m: Transmogrifier) => {
      // fill the contact information into the form
      this.contactInformationForm.controls['contactInformation'].setValue(m.organizationMeta.contactInformation);
      // collect persons into this component for use
      this.persons = m.persons;
    });
  }
  onInput() {
    // emittable
    const ci: ContactInformation = this.contactInformationForm.value['contactInformation'];
    ci.boardContact = this.contactInformation.boardContact;
    ci.executiveContact = this.contactInformation.executiveContact;
    // emit the information
    this.contactInformationChange.emit(this.contactInformationForm.value['contactInformation']);
  }
  cleanBoardContact() {
    // if the board of directors is false we need to remove the object.
    if (!this.hasBoardOfDirectors) {
      this.contactInformation.boardContact = null;
    }
  }
}

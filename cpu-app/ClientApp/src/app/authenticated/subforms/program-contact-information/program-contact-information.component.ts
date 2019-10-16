import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person, iPerson } from '../../../core/models/person.class';
import { iContactInformation } from '../../../core/models/contact-information.class';

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

  executive: iPerson;
  boardContact: iPerson;

  constructor(
    // private boilerplateService: BoilerplateService,
    // private personService: PersonService,
  ) { }

  ngOnInit() {
    // get the boilerplate from the service
    // this.boilerplateService.getOrganizationBoilerplate('foobazqux').subscribe(ci => {
    // 	this.contactInformationForm = new FormGroup({
    // 		'contactInformation': new FormControl('', Validators.required)
    // 	});
    // 	this.contactInformationForm.controls['contactInformation'].setValue(ci);
    // });
    // set the persons list
    // this.personService.getPersons('borkityfoobar').subscribe(p => this.persons = p);
  }
  onInput() {
    console.log(this.contactInformationForm.value['contactInformation'])
    // emit the information
    this.contactInformationChange.emit(this.contactInformationForm.value['contactInformation']);
  }
  pickExecutive(event: iPerson) {
    this.executive = event;
  }
  pickBoardContact(event: iPerson) {
    this.boardContact = event;
  }
  cleanBoardContact() {
    // if the board of directors is false we need to remove the object.
    if (!this.hasBoardOfDirectors) {
      this.boardContact = null;
    }
  }
}

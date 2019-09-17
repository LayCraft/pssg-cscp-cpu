import { NgForm, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProgramInformation, iProgramMeta, Hours } from '../../classes/program-information.class';
import { ContactInformation } from '../../classes/contact-information.class';
@Component({
  selector: 'app-program-planner',
  templateUrl: './program-planner.component.html',
  styleUrls: ['./program-planner.component.scss']
})
export class ProgramPlannerComponent implements OnInit {
  // a viewchild to check the validity of the template form
  @ViewChild(NgForm) piForm;
  // is the contents of the form valid?
  @Input() programMeta: iProgramMeta;

  // the form model
  programInformationForm: ProgramInformation;
  differentProgramContact: boolean = false;
  programContactForm: ContactInformation;
  operationHours: Hours[] = [];
  standbyHours: Hours[] = [];

  currentTab: string;
  tabs: string[];

  constructor(
    // private boilerplateService: BoilerplateService,
    // private programInformationService: ProgramInformationService,
  ) {
    this.tabs = ['Contact Information', 'Delivery Information', 'Reporting Requirements'];
    this.currentTab = this.tabs[0];
  }

  ngOnInit() {
    this.programInformationForm = new ProgramInformation();
    this.programContactForm = new ContactInformation();
    // initialize the program information if it is supplied else make a new object
    // this.programInformationService.getProgramInformation(this.programMeta.organizationId, this.programMeta.programId).subscribe((p: iProgramInformation) => {
    //   this.programInformationForm = new ProgramInformation(p);
    // });
  }

  // form helpers. Validity hints and hide/show toggles
  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }
  onInput() { }

  showProgramContact() {
    // Whether turned off or on we wipe out the contact information
    this.programContactForm = new ContactInformation();
    this.differentProgramContact = !this.differentProgramContact;
  }

  addOperationHours() {
    this.operationHours.push(new Hours());
  }
  addStandbyHours() {
    this.standbyHours.push(new Hours());
  }
}

import { NgForm, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProgramInformation, iProgramMeta, iProgramInformation } from '../../classes/program-information.class';
import { BoilerplateService } from '../../services/boilerplate.service';
import { ProgramInformationService } from '../../services/program-information.service';
@Component({
  selector: 'app-program-planner',
  templateUrl: './program-planner.component.html',
  styleUrls: ['./program-planner.component.scss']
})
export class ProgramPlannerComponent implements OnInit {
  // a viewchild to check the validity of the template form
  @ViewChild(NgForm) piForm;
  // is the contents of the form valid?
  @Output() valid = new EventEmitter<boolean>();
  @Input() programMeta: iProgramMeta;

  // the form model
  programInformationForm: ProgramInformation;

  currentTab: string;
  tabs: string[];
  constructor(
    private boilerplateService: BoilerplateService,
    private programInformationService: ProgramInformationService,
  ) {
    this.tabs = ['Contact Information', 'Delivery Information', 'Reporting Requirements'];
    this.currentTab = this.tabs[0];
  }

  ngOnInit() {
    // initialize the program information if it is supplied else make a new object
    this.programInformationService.getProgramInformation(this.programMeta.organizationId, this.programMeta.programId).subscribe((p: iProgramInformation) => {
      this.programInformationForm = new ProgramInformation(p);
    });

  }

  // form helpers. Validity hints and hide/show toggles
  showValidFeedback(control: AbstractControl): boolean { return !(control.valid && (control.dirty || control.touched)) }
  showInvalidFeedback(control: AbstractControl): boolean { return !(control.invalid && (control.dirty || control.touched)) }
  onInput() { }
}

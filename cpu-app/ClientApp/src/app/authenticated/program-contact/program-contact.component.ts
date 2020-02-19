import { AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormHelper } from '../../core/form-helper';
import { Hours } from '../../core/models/hours.class';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { iContactInformation } from '../../core/models/contact-information.interface';
import { iPerson } from '../../core/models/person.interface';
import { iProgramApplication } from '../../core/models/program-application.interface';
import { EMAIL, PHONE_NUMBER } from '../../core/constants/regex.constants';
import { iHours } from '../../core/models/hours.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramApplicationService } from '../../core/services/program-application.service';
import { TransmogrifierProgramApplication } from '../../core/models/transmogrifier-program-application.class';
import { convertProgramApplicationToDynamics } from '../../core/models/converters/program-application-to-dynamics';
import { NotificationQueueService } from '../../core/services/notification-queue.service';

@Component({
  selector: 'app-program-contact',
  templateUrl: './program-contact.component.html',
  styleUrls: ['./program-contact.component.css']
})
export class ProgramContactComponent implements OnInit {
  programApplication: iProgramApplication;
  @Output() programApplicationChange = new EventEmitter<iProgramApplication>();
  required = false;
  // the form model
  differentProgramContact: boolean = false;
  persons: iPerson[] = [];
  programContactInformation: iContactInformation;
  programTrans: TransmogrifierProgramApplication;
  trans: Transmogrifier;
  // helpers for setting form state
  public formHelper = new FormHelper();
  emailRegex: RegExp;
  phoneRegex: RegExp;
  out: any;
  errorState: boolean = false;

  constructor(
    private notificationQueueService: NotificationQueueService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router,
    private programApplicationService: ProgramApplicationService,
  ) {

    this.emailRegex = EMAIL;
    this.phoneRegex = PHONE_NUMBER;
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      const userId: string = this.stateService.main.getValue().userId;
      const organizationId: string = this.stateService.main.getValue().organizationId;
      // get the program application to fill
      this.programApplicationService.getProgramApplication(organizationId, userId, p['contractId']).subscribe(
        f => {
          if (!f.IsSuccess) {
            // notify the user of a system error


            // route back to the dashboard
            this.router.navigate(['/authenticated/dashboard']);
          } else {

            console.log("program contact dynamics info");
            console.log(f);

            // make the transmogrifier for this form
            this.programTrans = new TransmogrifierProgramApplication(f);
            this.programApplication = this.programTrans.programApplications.find(pa => pa.programId === p['programId']);


            console.log("desired program info...");
            console.log(this.programApplication);

            if (!this.programApplication) {
              this.notificationQueueService.addNotification('An attempt at getting this program information was unsuccessful. If the problem persists please notify your ministry contact.', 'danger');
              this.errorState = true;
            }

            this.stateService.main.subscribe((m: Transmogrifier) => {
              this.trans = m;
              //program contact seems to only bring over the personId, and not any name info or stuff like that. But main transmogrifier does have that info in persons array - so get that
              if (this.programApplication.programContact && this.programApplication.programContact.personId) {
                this.programApplication.programContact = this.trans.persons.find(p => p.personId === this.programApplication.programContact.personId);
              }

            });
            //TODO - if !this.programApplication

          }
        });
      this.onInput();
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
    this.programApplication.operationHours = this.programApplication.operationHours.filter((hours: iHours, j: number) => i !== j);
  }
  removeStandbyHours(i: number) {
    this.programApplication.standbyHours = this.programApplication.standbyHours.filter((hours: iHours, j: number) => i !== j);
  }

  onProgramContactChange(event: iPerson) {
    console.log("change");
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
  save(): void {
    // this.saving = true;
    this.out = convertProgramApplicationToDynamics(this.programTrans);
    this.programApplicationService.setProgramApplication(this.out).subscribe(
      r => {
        console.log(r);
        this.notificationQueueService.addNotification(`You have successfully saved the program contact.`, 'success');
        this.router.navigate(['/authenticated/dashboard']);
      },
      err => {
        console.log(err);
        this.notificationQueueService.addNotification('The program contact could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
        // this.saving = false;
      }
    );
  }
  onExit() {
    if (confirm("All unsaved changes will be lost. Are you sure you want to return to the dashboard?")) {
      this.stateService.refresh();
      // send the user back to the dashboard
      this.router.navigate([this.stateService.homeRoute.getValue()]);
    }
  }
}

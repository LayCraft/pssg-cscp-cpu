import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { StateService } from '../../core/services/state.service';
import { TransmogrifierProgramApplication } from '../../core/models/transmogrifier-program-application.class';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { FormHelper } from '../../core/form-helper';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import { AddPersonDialog } from '../dialogs/add-person/add-person.dialog';
import { CAPApplicationService } from '../../core/services/cap-application.service';
import { TransmogrifierCAPApplication } from '../../core/models/transmogrifier-cap-application.class';
import { CAPProgram } from '../../core/models/cap-program.class';
import { iCAPProgram } from '../../core/models/cap-program.interface';
import { convertCAPProgramToDynamics } from '../../core/models/converters/cap-program-to-dynamics';
import { CAPGuidelinesDialog } from '../dialogs/cap-guidelines/cap-guidelines.dialog';
import { ProgramEgilibilityDialog } from '../dialogs/program-egilibility/program-egilibility.dialog';
import { Subscription } from 'rxjs';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { iContract } from '../../core/models/contract.interface';

@Component({
    selector: 'app-cap-application',
    templateUrl: './cap-application.component.html',
    styleUrls: ['./cap-application.component.scss']
})
export class CAPApplicationComponent implements OnInit {
    trans: TransmogrifierCAPApplication;

    // used for the stepper component
    stepperElements: iStepperElement[];
    currentStepperElement: iStepperElement;
    stepperIndex: number = 0;

    saving: boolean = false;
    isCompleted: boolean = false;
    discriminators: string[] = ['funding_criteria', 'applicant_information', 'program', 'authorization'];
    baseFiscalYear: number;

    private stateSubscription: Subscription;

    private formHelper = new FormHelper();
    contracategory: string = "";
    contracts: iContract[] = [];

    constructor(
        private notificationQueueService: NotificationQueueService,
        private route: ActivatedRoute,
        private router: Router,
        private stateService: StateService,
        private stepperService: IconStepperService,
        private capService: CAPApplicationService,
        public dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
            // save the transmogrifier
            this.contracts = m.contracts;
            if (this.trans) {
                this.getFiscalYear();
            }
        });

        // get the right contract by route
        this.route.queryParams.subscribe(q => {
            // console.log(q);
            if (q && q.completed) {
                this.isCompleted = q.completed == "true";
            }
        });
        this.route.params.subscribe(p => {
            // console.log(p);
            // collect the current user information from the state.
            const userId: string = this.stateService.main.getValue().userId;
            const organizationId: string = this.stateService.main.getValue().organizationId;
            // get the program application to fill
            this.capService.getCAPApplication(organizationId, userId, p['taskId']).subscribe(
                f => {
                    if (!f.IsSuccess) {
                        this.notificationQueueService.addNotification('An attempt at getting this cap application form was unsuccessful. If the problem persists please notify your ministry contact.', 'danger');
                        this.router.navigate(['/authenticated/dashboard']);
                    } else {
                        console.log("cap application dynamics info");
                        console.log(f);

                        // make the transmogrifier for this form
                        this.trans = new TransmogrifierCAPApplication(f);
                        console.log("cap application transmogrifier");
                        console.log(this.trans);

                        this.constructDefaultstepperElements(this.trans);

                        if (this.contracts) {
                            this.getFiscalYear();
                        }

                    }
                }
            );
        });
        // subscribe to the stepper state
        this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
        this.stepperService.currentStepperElement.subscribe(e => {
            if (this.currentStepperElement) {
                let originalStepper = _.cloneDeep(this.currentStepperElement);
                let formState = this.formHelper.getFormState();

                if (originalStepper.formState === "complete" && formState === "untouched") {
                    //do nothing...
                }
                else if (originalStepper.formState !== "incomplete" || formState !== "untouched") {
                    this.currentStepperElement.formState = formState;
                }
            }
            this.currentStepperElement = e;

            if (this.currentStepperElement && this.stepperElements) {
                this.stepperIndex = this.stepperElements.findIndex(e => e.id === this.currentStepperElement.id);
            }
        });
    }

    getFiscalYear() {
        let self = this;
        self.baseFiscalYear = new Date().getFullYear();

        let thisContract = self.contracts.find(c => c.contractId === self.trans.contractId);
        if (thisContract) {
            if (thisContract.category === 'upcoming') {
                ++self.baseFiscalYear;
            }
            else if (thisContract.category === 'past') {
                --self.baseFiscalYear;
            }
        }

        self.trans.fiscalYear = `${self.baseFiscalYear} to ${self.baseFiscalYear + 1}`;
    }

    isCurrentStepperElement(item: iStepperElement): boolean {
        if (item.id === this.currentStepperElement.id) {
            return true;
        }
        return false;
    }
    constructDefaultstepperElements(m: TransmogrifierCAPApplication) {
        // clean out the old things that might be living in the stepper.
        this.stepperService.reset();
        // write the default beginning
        [
            {
                itemName: 'Funding Application',
                formState: 'untouched',
                object: null,
                discriminator: 'funding_criteria',

            },
            {
                itemName: 'Applicant Information',
                formState: 'untouched',
                object: null, //{ type: ApplicantInformation, data: m.administrativeInformation },
                discriminator: 'applicant_information',
            },
        ].forEach((f: iStepperElement) => {
            this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
        });

        // if there are no program applications what are we doing here?
        if (!this.trans.capPrograms.length) {
            this.stepperService.addStepperElement(null, 'CAP Application Does Not Include Programs', 'invalid');
            this.notificationQueueService.addNotification('A cap application should always have a program attached. This is a problem with the data held by the ministry. Please contact your ministry representative and let them know that this has occured and that you cannot complete your program application.', 'danger', 99999999);
        }

        // add the programs to the list
        this.trans.capPrograms.forEach((p: iCAPProgram) => {
            this.stepperService.addStepperElement({ type: CAPProgram, data: p }, p.name, 'untouched', 'program');
        });
        // Write the default end part

        let finalStepperElements = [
            {
                itemName: 'Authorization',
                formState: 'untouched',
                object: null,
                discriminator: 'authorization',
            },
        ];

        if (this.isCompleted) {
            finalStepperElements.pop();
        }

        finalStepperElements.forEach((f: iStepperElement) => {
            this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
        });
        // put the page naviagation to the first page
        this.stepperService.setToFirstStepperElement();
    }
    save(showNotification: boolean = true, shouldExit: boolean = false) {
        return new Promise((resolve, reject) => {
            try {
                // resolve();
                this.saving = true;
                console.log("saving...");
                console.log(_.cloneDeep(this.trans));
                this.capService.setCAPApplication(convertCAPProgramToDynamics(this.trans)).subscribe(
                    r => {
                        if (showNotification) {
                            this.notificationQueueService.addNotification(`You have successfully saved the program application.`, 'success');
                        }
                        this.saving = false;
                        this.stepperElements.forEach(s => {
                            if (s.formState === 'complete') return;

                            if (s.formState !== 'untouched') this.stepperService.setStepperElementProperty(s.id, "formState", "complete");
                            else this.stepperService.setStepperElementProperty(s.id, "formState", "untouched");
                        });

                        if (shouldExit) this.router.navigate(['/authenticated/dashboard']);

                        this.formHelper.makeFormClean();
                        this.reloadProgramApplication();
                        resolve();
                    },
                    err => {
                        console.log(err);
                        this.notificationQueueService.addNotification('The cap application could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
                        this.saving = false;
                        reject();
                    }
                );
            }
            catch (err) {
                console.log(err);
                this.notificationQueueService.addNotification('The cap application could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
                this.saving = false;
                reject();
            }
            // if (!this.formHelper.isFormValid(this.notificationQueueService)) {

        });
    }
    exit() {
        if (this.formHelper.showWarningBeforeExit()) {
            if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
                this.stateService.refresh();
                this.router.navigate(['/authenticated/dashboard']);
            }
        }
        else {
            this.stateService.refresh();
            this.router.navigate(['/authenticated/dashboard']);
        }
    }
    submit() {
        try {
            if (!this.formHelper.isFormValid(this.notificationQueueService)) {
                return;
            }
            this.saving = true;
            console.log("submitting...");
            console.log(_.cloneDeep(this.trans));
            this.capService.setCAPApplication(convertCAPProgramToDynamics(this.trans)).subscribe(
                r => {
                    // console.log(r);

                    this.notificationQueueService.addNotification(`You have successfully submitted the cap application.`, 'success');
                    this.saving = false;
                    this.stateService.refresh();
                    this.router.navigate(['/authenticated/dashboard']);
                },
                err => {
                    console.log(err);
                    this.notificationQueueService.addNotification('The cap application could not be submitted. If this problem is persisting please contact your ministry representative.', 'danger');
                    this.saving = false;
                }
            );
        }
        catch (err) {
            console.log(err);
            this.notificationQueueService.addNotification('The cap application could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
            this.saving = false;
        }
    }
    reloadProgramApplication() {
        this.route.params.subscribe(p => {
            // collect the current user information from the state.
            const userId: string = this.stateService.main.getValue().userId;
            const organizationId: string = this.stateService.main.getValue().organizationId;
            // get the program application to fill
            // this.programApplicationService.getProgramApplication(organizationId, userId, p['taskId']).subscribe(
            //     f => {
            //         if (!f.IsSuccess) {
            //             // notify the user of a system error
            //             this.notificationQueueService.addNotification('An attempt at getting this program application form was unsuccessful. If the problem persists please notify your ministry contact.', 'danger');
            //             // console.log(`IsSuccess was returned false when attempting to get Organization:${organizationId} User:${userId} Contract:${p['taskId']} from the program application API on OpenShift. The most likely cause is that the Dynamics data has changed, the Dynamics API has a bug, or the mapping of data requires modification to accomodate a change.`);

            //             // route back to the dashboard
            //             this.router.navigate(['/authenticated/dashboard']);
            //         } else {
            //             this.data = f;
            //             let tempTrans = new TransmogrifierCAPApplication(f);

            //             for (let i = 0; i < tempTrans.programApplications.length; ++i) {
            //                 Object.assign(this.trans.programApplications[i], tempTrans.programApplications[i]);
            //                 if (this.trans.programApplications[i].standbyHours.length == 0) {
            //                     this.trans.programApplications[i].standbyHours.push(new Hours());
            //                 }
            //                 if (this.trans.programApplications[i].operationHours.length == 0) {
            //                     this.trans.programApplications[i].operationHours.push(new Hours());
            //                 }
            //             }
            //         }
            //     }
            // );
        });
    }

    setNextStepper() {
        let originalStepper = _.cloneDeep(this.currentStepperElement);
        let currentTabHasInvalidClass = originalStepper.formState === "invalid" ? 1 : 0;

        // console.log(originalStepper.object);
        if (originalStepper.object) {
            let obj_to_validate = new originalStepper.object.type(originalStepper.object.data);
            // console.log(obj_to_validate);
            // console.log(obj_to_validate.hasRequiredFields());
            if (!obj_to_validate.hasRequiredFields()) {
                console.log(obj_to_validate.getMissingFields());
                this.notificationQueueService.addNotification('Please fill in all required fields', 'warning');
                return;
            }
        }

        if (!this.formHelper.isFormValid(this.notificationQueueService, currentTabHasInvalidClass)) {
            // this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', this.formHelper.getFormState());
            return;
        }

        if (!this.trans.signature.signatureDate && !this.isCompleted) {
            setTimeout(() => {
                this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'saving');
            }, 0);

            this.save(false).then(() => {
                this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'complete');
            }).catch(() => {
                this.stepperService.setStepperElementProperty(originalStepper.id, 'formState', 'invalid');
            });
        }

        ++this.stepperIndex;
        this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
    }
    setPreviousStepper() {
        --this.stepperIndex;
        this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
    }

    showAddPersonDialog() {
        let dialogRef = this.dialog.open(AddPersonDialog, {
            autoFocus: false,
            width: '80vw',
            data: { agencyAddress: this.trans.applicantInformation.mailingAddress }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.stateService.refresh();
            }
        });
    }

    showCAPGuidelines() {
        this.dialog.open(CAPGuidelinesDialog);
    }
    showProgramEligibility() {
        this.dialog.open(ProgramEgilibilityDialog);
    }
}
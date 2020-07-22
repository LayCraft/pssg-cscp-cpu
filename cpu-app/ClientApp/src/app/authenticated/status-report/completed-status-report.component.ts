import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconStepperService, iStepperElement } from '../../shared/icon-stepper/icon-stepper.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusReportService } from '../../core/services/status-report.service';
import { StateService } from '../../core/services/state.service';
import { FormHelper } from '../../core/form-helper';
import * as _ from 'lodash';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { TransmogrifierCompleteStatusReport } from '../../core/models/transmogrifier-complete-status-report.class';
import { iAnswerCollection } from '../../core/models/answer-collection.interface';

@Component({
    selector: 'app-completed-status-report',
    templateUrl: './completed-status-report.component.html',
    styleUrls: ['./completed-status-report.component.scss']
})
export class CompletedStatusReportComponent implements OnInit, OnDestroy {
    data: any;
    trans: TransmogrifierCompleteStatusReport;
    mainTrans: Transmogrifier;
    // used for the stepper component
    stepperElements: iStepperElement[];
    currentStepperElement: iStepperElement;
    stepperIndex: number = 0;
    saving: boolean = false;
    didload: boolean = false;

    public formHelper = new FormHelper();
    constructor(
        private notificationQueueService: NotificationQueueService,
        private route: ActivatedRoute,
        private router: Router,
        private statusReportService: StatusReportService,
        private stateService: StateService,
        private stepperService: IconStepperService,
    ) { }

    ngOnInit() {
        this.didload = false;
        this.mainTrans = this.stateService.main.getValue();
        this.route.params.subscribe(p => {
            // collect information for collecting the data
            const organizationId: string = this.stateService.main.getValue().organizationId;
            const userId: string = this.stateService.main.getValue().userId;
            // console.log(p);
            // console.log(p['dataCollectionId']);

            this.statusReportService.getStatusReportAnswers(organizationId, userId, p['dataCollectionId'])
                .subscribe(r => {
                    if (!r.IsSuccess) {
                        // notify the user of a system error
                        this.notificationQueueService.addNotification('An attempt at getting this status report was unsuccessful. If this problem persists please notify your ministry contact.', 'danger');
                        // console.log(`IsSuccess was returned false when attempting to get Organization:${organizationId} User:${userId} Task:${p['taskId']} from the status report API on OpenShift. The most likely cause is that the Dynamics data has changed, the Dynamics API has a bug, or the mapping of data requires modification to accomodate a change.`);
                        // route back to the dashboard
                        this.router.navigate(['/authenticated/dashboard']);
                    } else {

                        // make the transmogrifier for this form
                        this.data = r;

                        // construct the stepper
                        this.trans = new TransmogrifierCompleteStatusReport(r);
                        // this.trans.taskId = p['taskId'];
                        let contract = this.mainTrans.contracts.find(c => c.contractNumber === this.trans.contractNumber);
                        let title = (this.trans.reportingPeriod ? this.trans.reportingPeriod : 'Monthly') + 'Status Report';
                        if (contract) {
                            //   let thisTask = contract.tasks.find(t => t.taskId === this.trans.taskId);
                            //   if (thisTask) title = thisTask.taskTitle;
                        }

                        this.trans.title = title;

                        console.log("dynamics data status report:");
                        console.log(r);
                        console.log("trans");
                        console.log(this.trans);

                        this.constructDefaultstepperElements();
                    }
                });
        });

        // Subscribe to the stepper elements
        this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
        this.stepperService.currentStepperElement.subscribe(e => {
            this.currentStepperElement = e;

            if (this.currentStepperElement && this.stepperElements) {
                this.stepperIndex = this.stepperElements.findIndex(e => e.id === this.currentStepperElement.id);
            }
        });
    }
    ngOnDestroy() {
        this.didload = false;
    }
    constructDefaultstepperElements() {
        this.stepperService.reset();
        this.trans.statusReportAnswers
            .map((srq: iAnswerCollection): iStepperElement => {
                return {
                    itemName: srq.name,
                    formState: 'untouched',
                    object: null,
                    discriminator: null,
                }
            })
            .forEach((f: iStepperElement) => {
                this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
            });
        // make the first element the selected one.
        this.stepperService.setToFirstStepperElement();
        this.didload = true;
    }
    // isCurrentStepperElement(item: iStepperElement): boolean {
    //     if (item.id === this.currentStepperElement.id) {
    //         return true;
    //     }
    //     return false;
    // }
    exit() {
        this.stateService.refresh();
        this.router.navigate(['/authenticated/dashboard']);
    }

    setNextStepper() {
        ++this.stepperIndex;
        this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
    }
    setPreviousStepper() {
        --this.stepperIndex;
        this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
    }
}

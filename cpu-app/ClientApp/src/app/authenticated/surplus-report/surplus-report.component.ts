import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from 'lodash';
import { FormHelper } from "../../core/form-helper";
import { NotificationQueueService } from "../../core/services/notification-queue.service";
import { ProgramSurplusService } from "../../core/services/program-surplus.service";
import { StateService } from "../../core/services/state.service";
import { TransmogrifierProgramSurplus } from "../../core/models/transmogrifier-program-surplus.class";
import { iDynamicsPostSurplusPlan } from "../../core/models/dynamics-post";
import { convertProgramSurplusToDynamics } from "../../core/models/converters/program-surplus-to-dynamics";
import { iSurplusItem } from "../../core/models/surplus-item.interface";

@Component({
    selector: 'app-surplus-report',
    templateUrl: './surplus-report.component.html',
    styleUrls: ['./surplus-report.component.scss']
})
export class SurplusReportComponent implements OnInit {
    data: any;
    trans: TransmogrifierProgramSurplus;

    saving: boolean = false;
    isCompleted: boolean = false;

    pay_with_cheque: boolean = false;
    surplus_amount: number = 0;
    total_allocated_amount: number = 0;
    q1_total: number = 0;
    q2_total: number = 0;
    q3_total: number = 0;
    q4_total: number = 0;
    remaining_amount: number = 0;

    public formHelper = new FormHelper();

    constructor(
        private notificationQueueService: NotificationQueueService,
        private programSurplusService: ProgramSurplusService,
        private route: ActivatedRoute,
        private router: Router,
        private stateService: StateService,
        public ref: ChangeDetectorRef,
    ) { }

    ngOnInit() {
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
            // get the program surplus
            this.programSurplusService.getProgramSurplus(organizationId, userId, p['surplusId']).subscribe(
                f => {
                    if (!f.IsSuccess) {
                        // notify the user of a system error
                        this.notificationQueueService.addNotification('An attempt at getting this program surplus form was unsuccessful. If the problem persists please notify your ministry contact.', 'danger');

                        // route back to the dashboard
                        this.router.navigate(['/authenticated/dashboard']);
                    } else {
                        this.data = f;

                        console.log("program surplus dynamics info");
                        console.log(f);

                        this.trans = new TransmogrifierProgramSurplus(f);
                        console.log("Program surplus transmogrifier");
                        console.log(this.trans);
                        this.surplus_amount = this.trans.surplusAmount;

                        this.calculateTotals();

                    }
                }
            );
        });
    }

    calculateTotals() {
        this.remaining_amount = this.surplus_amount;
        this.total_allocated_amount = 0;
        this.q1_total = 0;
        this.q2_total = 0;
        this.q3_total = 0;
        this.q4_total = 0;
        this.trans.lineItems.forEach((item: iSurplusItem) => {
            this.total_allocated_amount += item.allocated_amount;
            this.q1_total += item.expenditures_q1;
            this.q2_total += item.expenditures_q2;
            this.q3_total += item.expenditures_q3;
            this.q4_total += item.expenditures_q4;
            this.remaining_amount -= (item.expenditures_q1 + item.expenditures_q2 + item.expenditures_q3 + item.expenditures_q4);
        });
    }

    saveAndExit() {
        try {
            if (!this.formHelper.isFormValid(this.notificationQueueService)) {
                return;
            }
            this.saving = true;
            let data: iDynamicsPostSurplusPlan = convertProgramSurplusToDynamics(this.trans);
            console.log("save and exit");
            console.log(data);
            this.programSurplusService.setProgramSurplus(data).subscribe(
                r => {
                    console.log(r);

                    this.notificationQueueService.addNotification(`You have successfully saved the surplus plan.`, 'success');
                    this.saving = false;
                    this.stateService.refresh();
                    this.router.navigate(['/authenticated/dashboard']);
                },
                err => {
                    console.log(err);
                    this.notificationQueueService.addNotification('The surplus plan could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
                    this.saving = false;
                }
            );
        }
        catch (err) {
            console.log(err);
            this.notificationQueueService.addNotification('The surplus plan could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
            this.saving = false;
        }
    }

    submit() {
        try {
            if (!this.formHelper.isFormValid(this.notificationQueueService)) {
                return;
            }
            this.saving = true;
            let data: iDynamicsPostSurplusPlan = convertProgramSurplusToDynamics(this.trans);
            console.log("attempting submit");
            console.log(data);
            this.programSurplusService.setProgramSurplus(data).subscribe(
                r => {
                    console.log(r);

                    this.notificationQueueService.addNotification(`You have successfully submitted the surplus plan.`, 'success');
                    this.saving = false;
                    this.stateService.refresh();
                    this.router.navigate(['/authenticated/dashboard']);
                },
                err => {
                    console.log(err);
                    this.notificationQueueService.addNotification('The surplus plan could not be submitted. If this problem is persisting please contact your ministry representative.', 'danger');
                    this.saving = false;
                }
            );
        }
        catch (err) {
            console.log(err);
            this.notificationQueueService.addNotification('The surplus plan could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
            this.saving = false;
        }
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

}
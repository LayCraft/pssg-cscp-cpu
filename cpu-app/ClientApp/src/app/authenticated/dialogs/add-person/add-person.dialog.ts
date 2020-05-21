import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { iPerson } from '../../../core/models/person.interface';
import { iProgramApplication } from '../../../core/models/program-application.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';
import * as _ from 'lodash'
import { Person } from '../../../core/models/person.class';
import { FormHelper } from '../../../core/form-helper';
import { NotificationQueueService } from '../../../core/services/notification-queue.service';
import { convertPersonnelToDynamics } from '../../../core/models/converters/personnel-to-dynamics';
import { StateService } from '../../../core/services/state.service';
import { PersonService } from '../../../core/services/person.service';

@Component({
    selector: 'add-person.dialog',
    templateUrl: 'add-person.dialog.html',
    styleUrls: ['./add-person.dialog.scss']
})
export class AddPersonDialog {
    programApplication: iProgramApplication;
    person: iPerson;

    public nameAssemble = nameAssemble;
    public formHelper = new FormHelper();
    saving: boolean = false;

    constructor(public dialogRef: MatDialogRef<AddPersonDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private stateService: StateService,
        private personService: PersonService,
        private notificationQueueService: NotificationQueueService) {
        this.programApplication = data.programApplication;
        this.person = new Person();
    }

    setAddressSameAsAgency(person: iPerson) {
        let addressCopy = _.cloneDeep(this.programApplication.mainAddress)
        person.address = addressCopy;
    }

    save() {
        try {
            if (!this.formHelper.isFormValid(this.notificationQueueService)) {
                return;
            }

            console.log(this.person);
            this.saving = true;
            // a person needs minimum a first and last name to be submitted
            if (this.person.firstName && this.person.lastName) {
                const userId = this.stateService.main.getValue().userId;
                const organizationId = this.stateService.main.getValue().organizationId;
                const post = convertPersonnelToDynamics(userId, organizationId, [this.person]);
                this.personService.setPersons(post).subscribe(
                    () => {
                        this.saving = false;
                        this.notificationQueueService.addNotification(`Information is saved for ${nameAssemble(this.person.firstName, this.person.middleName, this.person.lastName)}`, 'success');
                        this.dialogRef.close(true);
                    },
                    err => {
                        this.notificationQueueService.addNotification(err, 'danger');
                        this.saving = false;
                    }
                );
            } else {
                this.saving = false;
                // notify the user that this user was not saved.
                this.notificationQueueService.addNotification('A person must have a first and last name.', 'warning');
            }
        }
        catch (err) {
            console.log(err);
            this.notificationQueueService.addNotification('The agency staff could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
            this.saving = false;
        }
    }

    close() {
        this.dialogRef.close();
    }
}

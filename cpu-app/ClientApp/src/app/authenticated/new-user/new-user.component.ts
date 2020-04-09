import { Component, OnInit } from '@angular/core';
import { iPerson } from '../../core/models/person.interface';
import { FormHelper } from '../../core/form-helper';
import { EMAIL, PHONE_NUMBER, LETTERS_SPACES } from '../../core/constants/regex.constants';
import { Person } from '../../core/models/person.class';
import { StateService } from '../../core/services/state.service';
import { Router } from '@angular/router';
import { TransmogrifierNewUser } from '../../core/models/converters/transmogrifier-new-user.class';
import { iDynamicsContactNotApproved } from '../../core/models/dynamics-blob';
import { convertNewUserToDynamics } from '../../core/models/converters/new-user-to-dynamics';
import { NewUserService } from '../../core/services/new-user.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  emailRegex: RegExp = EMAIL;
  phoneRegex: RegExp = PHONE_NUMBER;
  wordRegex: RegExp = LETTERS_SPACES;
  organizationName: string;
  saving: boolean = false;
  trans: TransmogrifierNewUser = new TransmogrifierNewUser();
  public formHelper = new FormHelper();
  constructor(private stateService: StateService,
    private newUserService: NewUserService,
    private router: Router,
    private notificationQueueService: NotificationQueueService
  ) { }

  ngOnInit() {
    // const organizationId: string = this.stateService.main.getValue().organizationId;
    // const userId: string = this.stateService.main.getValue().userId;

    // let userNotApprovedObj: iDynamicsContactNotApproved = {
    //   Businessbceid: organizationId,
    //   Userbceid: userId
    // };
    // this.trans = new TransmogrifierNewUser(userNotApprovedObj);
  }

  save() {
    try {
      this.trans.organizationId = this.stateService.main.getValue().organizationId;
      this.trans.userId = this.stateService.main.getValue().userId;

      console.log(this.trans);
      let data = convertNewUserToDynamics(this.trans);
      this.newUserService.saveNewUser(data).subscribe((res) => {
        console.log(res);
        this.notificationQueueService.addNotification(`You have successfully registered a new user.`, 'success');
        this.stateService.refresh();
        this.router.navigate(['/authenticated/dashboard']);
        this.saving = false;
      },
        (err) => {
          console.log(err);
          this.notificationQueueService.addNotification('The new user could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
          this.saving = false;
        });
    }
    catch (err) {

    }
  }
  exit() {
    if (this.formHelper.isFormDirty() && confirm("Are you sure you want to exit?")) {
      // this.stateService.refresh();
      this.router.navigate(['']);
    }
    else {
      // this.stateService.refresh();
      this.router.navigate(['']);
    }
  }
}

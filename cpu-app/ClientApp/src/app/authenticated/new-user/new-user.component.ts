import { Component, OnInit } from '@angular/core';
import { iPerson } from '../../core/models/person.interface';
import { FormHelper } from '../../core/form-helper';
import { EMAIL, PHONE_NUMBER, LETTERS_SPACES } from '../../core/constants/regex.constants';
import { Person } from '../../core/models/person.class';
import { StateService } from '../../core/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  person: iPerson;
  emailRegex: RegExp = EMAIL;
  phoneRegex: RegExp = PHONE_NUMBER;
  wordRegex: RegExp = LETTERS_SPACES;
  organizationName: string;
  saving: boolean = false;
  public formHelper = new FormHelper();
  constructor(private stateService: StateService,
    private router: Router) { }

  ngOnInit() {
    this.person = new Person();
  }

  save() {
    console.log("save this new user:");
    console.log(this.person);
    console.log(this.stateService.userSettings.getValue());

    //TODO - save
  }
  exit() {
    if (this.formHelper.isFormDirty() && confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
    else {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from '../shared/form-base';
import { iTombstone } from '../classes/tombstone.class';
import { TombstoneService } from '../services/tombstone.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends FormBase implements OnInit {
  window = window;
  busy: Subscription;

  public selectedApplicationType: number = 0;
  public selectedApplicationName: string;
  showValidationMessage: boolean;

  tombstones: iTombstone[];

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private tombstoneService: TombstoneService
  ) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle('Home - Crime Prevention Unit');

    this.form = this.fb.group({
      applicationType: ['0', Validators.required],
    });

    // collect BCEIDs for the organization
    this.tombstoneService.getTombstones('FAKE BCEID').subscribe(t => this.tombstones = t);
  }

  updateForm(event) {
    var selection = parseInt(event.target.value.toLowerCase());

    this.selectedApplicationType = selection;
    this.selectedApplicationName = this.getApplicationName(selection).toUpperCase();

    this.form.get('completingOnBehalfOf').setValue('');
    this.form.get('wasCrimeInBC').setValue('');
  }

  canProceedWithApplication(): boolean {
    let applicationType = parseInt(this.form.get('applicationType').value) > 0;

    return applicationType;
  }

  getApplicationName(applicationNumber: number): string {
    switch (applicationNumber) {
      case 100000006:
        return 'Submit Annual Budget Proposal';
      case 100000005:
        return 'Submit Annual Report';
      case 100000004:
        return 'Schedule H';
      case 100000003:
        return 'Schedule G';
      case 100000002:
        return 'Monthly Statistics';
      case 100000001:
        return 'Renew Contract Application';
      case 100000000:
        return 'New Service Provider Application';
    }
    return '';
  }

  // marking the form as touched makes the validation messages show
  markAsTouched() {
    this.form.markAsTouched();
  }

  gotoApplication(): void {
    this.showValidationMessage = false;
    // let applicationType = parseInt(this.form.get('applicationType').value);

    // Possibly a more correct way to do this.. NG Routing?
    let routeUrl = '/renew-application';
    this.router.navigate([routeUrl]);//, navigationExtras);
  }
}

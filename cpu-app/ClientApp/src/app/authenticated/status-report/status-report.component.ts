import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iContract } from '../../core/models/contract';
import { IconStepperService, iStepperElement } from '../../shared/icon-stepper/icon-stepper.service';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.css']
})
export class StatusReportComponent implements OnInit {
  contract: iContract;
  // used for the stepper component
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  constructor(
    private stepperService: IconStepperService,
    private stateService: StateService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      // collect the contract from the route
      const contractId = p['contractId'];
      // don't subscribe because this is only used at page load to collect meta
      const contracts: iContract[] = this.stateService.main.getValue().contracts;
      // isolate the correct contract
      for (let contract of contracts) {
        if (contract.contractId == contractId) {
          this.contract = contract;
        }
      }
      // clear all of the old stepper elements
      this.stepperService.reset();
      this.constructDefaultstepperElements();
    });
    // stay in sync with
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
  }
  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      return true;
    }
    return false;
  }
  constructDefaultstepperElements() {
    // write the default beginning
    [
      {
        itemName: 'Page 1',
        formState: 'untouched',
        object: null,
        discriminator: 'contact_information',
      },
      {
        itemName: 'Page 2',
        formState: 'untouched',
        object: null,
        discriminator: 'administrative_information',
      }
    ].forEach((f: iStepperElement) => {
      this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
    });
  }
}

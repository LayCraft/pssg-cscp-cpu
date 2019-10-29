import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProgramBudget } from '../../core/models/budget-proposal.class';
import { StateService } from '../../core/services/state.service';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { iContract } from '../../core/models/contract';
import { iProgram } from '../../core/models/program';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';

@Component({
  selector: 'app-budget-proposal',
  templateUrl: './budget-proposal.component.html',
  styleUrls: ['./budget-proposal.component.css']
})
export class BudgetProposalComponent implements OnInit {
  // used for the stepper component
  currentStepperElement: iStepperElement;
  stepperElements: iStepperElement[];

  discriminators: string[] = ['program_overview', 'program', 'authorization'];
  contract: iContract;
  contractId: string;
  trans: Transmogrifier;

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

    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);

  }

  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      // names match? must be the same. Makes the assumption that all names are unique.
      return true;
    }
    return false;
  }
  constructDefaultstepperElements() {
    // write the default top element
    const topper = {
      itemName: 'Program Overview',
      formState: 'info',
      object: null,
      discriminator: 'program_overview',
    };
    this.stepperService.addStepperElement(topper.object, topper.itemName, topper.formState, topper.discriminator);

    // add the programs to the list
    this.contract.programs.forEach((c: iProgram) => {
      this.stepperService.addStepperElement(new ProgramBudget(), c.programName, 'untouched', 'program')
    });

    const bottom = {
      itemName: 'Authorization',
      formState: 'untouched',
      object: null,
      discriminator: 'authorization'
    };
    this.stepperService.addStepperElement(bottom.object, bottom.itemName, bottom.formState, bottom.discriminator);
  }
}

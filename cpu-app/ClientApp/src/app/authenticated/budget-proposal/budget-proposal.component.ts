import { Component, OnInit } from '@angular/core';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { iProgramBudget, ProgramBudget } from '../../core/models/budget-proposal.class';

@Component({
  selector: 'app-budget-proposal',
  templateUrl: './budget-proposal.component.html',
  styleUrls: ['./budget-proposal.component.css']
})
export class BudgetProposalComponent implements OnInit {
  contractId: string = 'bar';
  organizationId: string = 'foo';

  // / used for the stepper component
  currentStepperElement: iStepperElement;
  stepperElements: iStepperElement[];

  discriminators: ['program_overview', 'program', 'authorization'];

  constructor(
    // private budgetProposalService: BudgetProposalService,
    private stepperService: IconStepperService
  ) { }

  ngOnInit() {

    // clear all of the old ones out before subscribing to the new ones.
    this.stepperService.reset();
    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
    this.stepperService.currentStepperElement.subscribe(e => this.currentStepperElement = e);
    // set the default top and bottom list
    this.constructDefaultstepperElements();
  }

  isCurrentStepperElement(item: iStepperElement): boolean {
    if (item.id === this.currentStepperElement.id) {
      // names match? must be the same. Makes the assumption that all names are unique.
      return true;
    }
    return false;
  }
  constructDefaultstepperElements() {
    // this.budgetProposalService.getBudgetProposal('foo', 'bar').subscribe((bp: iBudgetProposal) => {
    // 	// write the default top element
    // 	const topper = {
    // 		itemName: 'Program Overview',
    // 		formState: 'info',
    // 		object: null,
    // 		discriminator: 'program_overview',
    // 	};
    // 	this.stepperService.addStepperElement(topper.object, topper.itemName, topper.formState, topper.discriminator);
    // 	// add the programs to the list
    // 	bp.programs.forEach((p: iProgramBudget) => {
    // 		this.stepperService.addStepperElement(new ProgramBudget(p), p.name, p.formState, 'program');
    // 	});
    // 	// Write the default end part
    // 	const bottom = {
    // 		itemName: 'Authorization',
    // 		formState: 'untouched',
    // 		object: null,
    // 		discriminator: 'authorization'
    // 	};
    // 	this.stepperService.addStepperElement(bottom.object, bottom.itemName, bottom.formState, bottom.discriminator);
    // });
  }
}

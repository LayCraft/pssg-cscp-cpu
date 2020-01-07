import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { iRevenueSource, RevenueSource } from '../../core/models/revenue-source.class';
import { iExpenseItem, ExpenseItem } from '../../core/models/budget-proposal.class';
import { iDynamicsBudgetProposal } from '../../core/models/dynamics-blob';
import { StateService } from '../../core/services/state.service';
import { BudgetProposalService } from '../../core/services/budget-proposal.service';
import { iExpenseTableMeta } from '../subforms/expense-table/expense-table.component';
import { TransmogrifierBudgetProposal } from '../../core/models/transmogrifier-budget-proposal.class';

@Component({
  selector: 'app-budget-proposal',
  templateUrl: './budget-proposal.component.html',
  styleUrls: ['./budget-proposal.component.css']
})
export class BudgetProposalComponent implements OnInit {
  // used for the stepper component
  currentStepperElement: iStepperElement;
  stepperElements: iStepperElement[];

  currentTab: string;
  tabs: string[];
  meta: {} = {
    totals: {
      // the default totals collector
      totalCost: 0,
      totalVscp: 0,
      totalPercentFundedByVscp: 0,
    }
  };

  revenueSources: iRevenueSource[] = [];
  expenseItems: iExpenseItem[] = [];
  defaultExpenseItems: iExpenseItem[] = [
    { itemName: 'Program - related' } as iExpenseItem,
    { itemName: 'Program - related office supplies / software' } as iExpenseItem,
    { itemName: 'Program - related travel' } as iExpenseItem,
    { itemName: 'Utilities' } as iExpenseItem,
    { itemName: 'Phone' } as iExpenseItem,
    { itemName: 'Staff training and associated travel' } as iExpenseItem,
    { itemName: 'Resource materials / printing costs' } as iExpenseItem,
    { itemName: 'Volunteer appreciation / honorariums' } as iExpenseItem,
    { itemName: 'Property maintenance' } as iExpenseItem,
  ];
  employees: iExpenseItem[] = [];

  adminExpenseItems: iExpenseItem[] = [];
  defaultAdminExpenseItems: iExpenseItem[] = [
    { itemName: 'Management salary/benefits' } as iExpenseItem,
    { itemName: 'Administrative support wages/benefits' } as iExpenseItem,
    { itemName: 'Administration-related' } as iExpenseItem,
    { itemName: 'Administrative-related utilities' } as iExpenseItem,
    { itemName: 'Bookeeping/bank fees' } as iExpenseItem,
  ];

  // these are programatically referenced so it is nice to have the constants
  sections: string[] = [
    'Salaries and Benefits',
    'Program Delivery Costs',
    'Administration Costs',
  ];

  trans: any;
  data: iDynamicsBudgetProposal;

  constructor(
    private stepperService: IconStepperService,
    private stateService: StateService,
    private budgetProposalService: BudgetProposalService,
    private route: ActivatedRoute,
  ) {
    this.tabs = ['Program Revenue Information', 'Program Expense'];
    this.currentTab = this.tabs[0];
  }

  ngOnInit() {
    // todo remove hard coding
    this.budgetProposalService.getBudgetProposal('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4', '0e309304-c4e6-e911-b811-00505683fbf4').subscribe(d => {
      this.data = d;
      this.trans = new TransmogrifierBudgetProposal(d);
    });
    this.revenueSources.push(new RevenueSource());
    this.expenseItems.push(new ExpenseItem());
    this.adminExpenseItems.push(new ExpenseItem());
    this.employees.push(new ExpenseItem());
    // // this.budgetProposalService.getBudgetProposal('asd','asd')
    // this.route.params.subscribe(p => {
    //   // collect the contract from the route
    //   const contractId = p['contractId'];
    //   // don't subscribe because this is only used at page load to collect meta
    //   const contracts: iContract[] = this.stateService.main.getValue().contracts;
    //   // isolate the correct contract
    //   for (let contract of contracts) {
    //     if (contract.contractId == contractId) {
    //       this.contract = contract;
    //     }
    //   }
    //   // clear all of the old stepper elements
    //   this.stepperService.reset();
    //   this.constructDefaultstepperElements();
    // });
    this.constructDefaultstepperElements();
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
    this.stepperService.reset();
    // write the default top element
    const topper = {
      itemName: 'Program Overview',
      formState: 'info',
      object: null,
      discriminator: 'program_overview',
    };
    this.stepperService.addStepperElement(topper.object, topper.itemName, topper.formState, topper.discriminator);
    //
    const bottom = {
      itemName: 'Authorization',
      formState: 'untouched',
      object: null,
      discriminator: 'authorization'
    };
    this.stepperService.addStepperElement(bottom.object, bottom.itemName, bottom.formState, bottom.discriminator);
  }

  collectMeta(event: iExpenseTableMeta, name: string) {
    function percentify(event: iExpenseTableMeta): number {
      // can't divide by zero
      if (event.totalCost > 0) {
        // too many decimal points onscreen
        return Math.round((event.totalVscp / event.totalCost) * 100);
      } else {
        return 0;
      }
    }

    // save the event meta for display in the summary boxes.
    this.meta[name] = {
      name, totalPercentFundedByVscp: percentify(event), ...event
    };

    // accumulator object in the meta array
    this.meta['totals'] = {
      totalCost: 0,
      totalVscp: 0,
      totalPercentFundedByVscp: 0,
    }
    for (let i = 0; i < this.sections.length; i++) {
      // if a value is calculated for the section add it to the grand total
      if (this.meta[this.sections[i]]) {
        // check that this is not infinity
        this.meta['totals'].totalCost = this.meta['totals'].totalCost + this.meta[this.sections[i]].totalCost;
      }
      if (this.meta[this.sections[i]]) {
        this.meta['totals'].totalVscp = this.meta['totals'].totalVscp + this.meta[this.sections[i]].totalVscp;
      }
    }
    this.meta['totals'].totalPercentFundedByVscp = percentify(this.meta['totals']);
  }
}

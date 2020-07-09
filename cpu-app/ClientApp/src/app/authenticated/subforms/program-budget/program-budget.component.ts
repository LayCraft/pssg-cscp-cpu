import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iProgramBudget } from '../../../core/models/program-budget.interface';
import { iExpenseTableMeta } from '../../subforms/expense-table/expense-table.component';
import { iStepperElement } from '../../../shared/icon-stepper/icon-stepper.service';
import { FormHelper } from '../../../core/form-helper';
import { RevenueSource } from '../../../core/models/revenue-source.class';
import { VSCP_APPROVED_SOURCE_NAME } from '../../../core/models/revenue-source.interface';

@Component({
  selector: 'app-program-budget',
  templateUrl: './program-budget.component.html',
  styleUrls: ['./program-budget.component.css']
})
export class ProgramBudgetComponent implements OnInit {
  @Input() programBudget: iProgramBudget;
  @Input() currentStepperElement: iStepperElement;
  @Input() isDisabled: boolean = false;
  @Output() programBudgetChange = new EventEmitter<iProgramBudget>();

  tabs: string[];
  // currentTab: string;
  sections: string[];
  meta: {} = {
    totals: {
      // the default totals collector
      totalCost: 0,
      totalVscp: 0,
      totalPercentFundedByVscp: 0,
    }
  };

  totalGrand: number = 0;
  vscpApprovedAmount: number = 0;
  remainingAmount: number = 0;

  private formHelper = new FormHelper();

  constructor() {
    this.tabs = ['Program Revenue Information', 'Program Expense'];
    // this.programBudget.currentTab = this.tabs[0];
    this.sections = [
      'Salaries and Benefits',
      'Program Delivery Costs',
      'Administration Costs',
    ];
  }

  ngOnInit() {
    this.totalGrand = 0;
    // console.log(this.programBudget);
    this.programBudget.revenueSources.forEach(rs => {
      this.totalGrand += ((rs.cash || 0) + (rs.inKindContribution || 0));
    });

    this.vscpApprovedAmount = 0;
    this.programBudget.revenueSources.forEach(rs => {
      if (rs.revenueSourceName === VSCP_APPROVED_SOURCE_NAME) {
        this.vscpApprovedAmount += ((rs.cash || 0) + (rs.inKindContribution || 0));
      }
    });
  }
  getTotalGrand(event: RevenueSource[]) {
    this.totalGrand = 0;
    event.forEach(rs => {
      this.totalGrand += ((rs.cash || 0) + (rs.inKindContribution || 0));
    });

    this.vscpApprovedAmount = 0;
    event.forEach(rs => {
      if (rs.revenueSourceName === VSCP_APPROVED_SOURCE_NAME) {
        this.vscpApprovedAmount += ((rs.cash || 0) + (rs.inKindContribution || 0));
      }
    });
  }
  collectMeta(event: iExpenseTableMeta, name: string) {
    function percentify(event: iExpenseTableMeta): number {
      // can't divide by zero
      if (event.vscpApprovedAmount > 0) {
        // too many decimal points onscreen
        return Math.round((event.totalVscp / event.vscpApprovedAmount) * 100);
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
      vscpApprovedAmount: this.vscpApprovedAmount,
      totalPercentFundedByVscp: 0,
    }
    for (let i = 0; i < this.sections.length; i++) {
      // if a value is calculated for the section add it to the grand total
      if (this.meta[this.sections[i]]) {
        // check that this is not infinity
        this.meta['totals'].totalCost += this.meta[this.sections[i]].totalCost;
      }
      if (this.meta[this.sections[i]]) {
        this.meta['totals'].totalVscp += this.meta[this.sections[i]].totalVscp;
      }
    }
    this.meta['totals'].totalPercentFundedByVscp = percentify(this.meta['totals']);


    //also get updated remaining amount to spend
    this.getRemainingAmount();
  }

  getRemainingAmount() {
    let vscpApprovedAmount = 0;
    this.programBudget.revenueSources.filter(rs => rs.isActive).forEach(rs => {
      if (rs.revenueSourceName === VSCP_APPROVED_SOURCE_NAME) {
        vscpApprovedAmount += ((rs.cash || 0) + (rs.inKindContribution || 0));
      }
    });

    let totalFundedFromVSCP = 0;
    this.programBudget.salariesAndBenefits.filter(sb => sb.isActive).forEach(sb => {
      totalFundedFromVSCP += (sb.fundedFromVscp || 0);
    });
    this.programBudget.programDeliveryCosts.filter(pd => pd.isActive).forEach(pd => {
      totalFundedFromVSCP += (pd.fundedFromVscp || 0);
    });
    this.programBudget.programDeliveryOtherExpenses.filter(pd => pd.isActive).forEach(pd => {
      totalFundedFromVSCP += (pd.fundedFromVscp || 0);
    });
    this.programBudget.administrationCosts.filter(ac => ac.isActive).forEach(ac => {
      totalFundedFromVSCP += (ac.fundedFromVscp || 0);
    });
    this.programBudget.administrationOtherExpenses.filter(ac => ac.isActive).forEach(ac => {
      totalFundedFromVSCP += (ac.fundedFromVscp || 0);
    });

    this.remainingAmount = vscpApprovedAmount - totalFundedFromVSCP;
  }

  setCurrentTab(tab: string) {
    let formState = this.formHelper.getFormState();

    if ((this.currentStepperElement.formState === "complete" && formState === "untouched") || this.currentStepperElement.formState === "invalid") {
      //do nothing...
    }
    else if (this.currentStepperElement.formState !== "incomplete" || formState != "untouched") {
      this.currentStepperElement.formState = formState;
    }

    this.programBudget.currentTab = tab;
    this.getRemainingAmount();
  }
}

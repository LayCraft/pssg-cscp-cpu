import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramBudgetComponent } from './program-budget/program-budget.component';
import { ProgramOverviewComponent } from './program-overview/program-overview.component';
import { ProgramBudgetSummaryComponent } from './program-budget-summary/program-budget-summary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BudgetProposalComponent } from './budget-proposal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		BudgetProposalComponent,
		ProgramBudgetComponent,
		ProgramBudgetSummaryComponent,
		ProgramOverviewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule, // For material components
		SharedModule, // For stepper
	],
	exports: [BudgetProposalComponent]
})
export class BudgetProposalModule { }
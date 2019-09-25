import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramBudgetComponent } from './program-budget/program-budget.component';
import { ProgramOverviewComponent } from './program-overview/program-overview.component';
import { ProgramBudgetSummaryComponent } from './program-budget-summary/program-budget-summary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BudgetProposalComponent } from './budget-proposal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		BudgetProposalComponent,
		ProgramBudgetComponent,
		ProgramOverviewComponent,
		ProgramBudgetSummaryComponent,
	],
	imports: [
		CommonModule,
		SharedModule, // For stepper
		FormsModule,
	]
})
export class BudgetProposalModule { }

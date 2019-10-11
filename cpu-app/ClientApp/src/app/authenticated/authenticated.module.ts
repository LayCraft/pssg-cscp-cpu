import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MinistryContactBoxComponent } from './components/ministry-contact-box/ministry-contact-box.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { OrganizationProfileBoxComponent } from './components/organization-profile-box/organization-profile-box.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { ProgramPlannerComponent } from './components/program-planner/program-planner.component';
import { MaterialModule } from '../core/material.module';
import { ProgramBudgetComponent } from './pages/budget-proposal/program-budget/program-budget.component';
import { ProgramBudgetSummaryComponent } from './pages/budget-proposal/program-budget-summary/program-budget-summary.component';
import { ProgramOverviewComponent } from './pages/budget-proposal/program-overview/program-overview.component';
import { ExpenseReportComponent } from './pages/expense-report/expense-report.component';
import { PersonnelComponent } from './pages/personnel/personnel.component';
import { PersonEditorComponent } from './pages/personnel/person-editor/person-editor.component';
import { ProgramApplicationComponent } from './pages/program-application/program-application.component';
import { CgLiabilityComponent } from './pages/program-application/cg-liability/cg-liability.component';
import { ReviewApplicationComponent } from './pages/program-application/review-application/review-application.component';
import { ProgramComponent } from './pages/program-application/program/program.component';
import { ProgramContactInformationComponent } from './pages/program-application/program-contact-information/program-contact-information.component';
import { AdministrativeInformationComponent } from './pages/program-application/administrative-information/administrative-information.component';
import { StatusReportComponent } from './pages/status-report/status-report.component';
import { BudgetProposalComponent } from './pages/budget-proposal/budget-proposal.component';

@NgModule({
	imports: [
		AuthenticatedRoutingModule,
		CommonModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		MaterialModule,
	],
	declarations: [
		AdministrativeInformationComponent,
		AuthenticatedComponent,
		BudgetProposalComponent,
		CgLiabilityComponent,
		DashboardComponent,
		DashboardComponent,
		ExpenseReportComponent,
		MinistryContactBoxComponent,
		NavigationBarComponent,
		OrganizationProfileBoxComponent,
		OrganizationProfilePageComponent,
		OrganizationProfilePageComponent,
		PersonDetailsComponent,
		PersonEditorComponent,
		PersonnelComponent,
		ProgramApplicationComponent,
		ProgramBudgetComponent,
		ProgramBudgetSummaryComponent,
		ProgramComponent,
		ProgramContactInformationComponent,
		ProgramOverviewComponent,
		ProgramPlannerComponent,
		ReviewApplicationComponent,
		StatusReportComponent,
	]
})
export class AuthenticatedModule { }

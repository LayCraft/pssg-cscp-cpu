import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { BudgetProposalModule } from '../modules/budget-proposal/budget-proposal.module';
import { ExpenseReportModule } from '../modules/expense-report/expense-report.module';
import { PersonnelModule } from '../modules/personnel/personnel.module';
import { ProgramApplicationModule } from '../modules/program-application/program-application.module';
import { SharedModule } from '../shared/shared.module';
import { StatusReportModule } from '../modules/status-report/status-report.module';

import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HoursComponent } from './components/hours/hours.component';
import { MinistryContactBoxComponent } from './components/ministry-contact-box/ministry-contact-box.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { OrganizationProfileBoxComponent } from './components/organization-profile-box/organization-profile-box.component';
import { OrganizationProfilePageComponent } from './modules/organization-profile-page/organization-profile-page.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonnelPageComponent } from './modules/personnel-page-DELETEME/personnel-page.component';
import { ProgramPageComponent } from './modules/program-page-DELETEME/program-page.component';
import { ProgramPlannerComponent } from './components/program-planner/program-planner.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
	imports: [
		AuthenticatedRoutingModule,
		CommonModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule,
		SharedModule,
		MaterialModule,

		// modules for this application
		BudgetProposalModule,
		ExpenseReportModule,
		ProgramApplicationModule,
		StatusReportModule,
		PersonnelModule,
	],
	declarations: [
		AuthenticatedComponent,
		DashboardComponent,
		HoursComponent,
		MinistryContactBoxComponent,
		NavigationBarComponent,
		OrganizationProfileBoxComponent,
		PersonDetailsComponent,
		ProgramPlannerComponent,
		////////////////////////
		DashboardComponent,
		OrganizationProfilePageComponent,
		OrganizationProfilePageComponent,
		PersonnelPageComponent,
		ProgramPageComponent,
	]
})
export class AuthenticatedModule { }

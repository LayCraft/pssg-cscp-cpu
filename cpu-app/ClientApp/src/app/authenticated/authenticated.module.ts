import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CgLiabilityComponent } from './components/cg-liability/cg-liability.component';
import { HoursComponent } from './components/hours/hours.component';
import { MinistryContactBoxComponent } from './components/ministry-contact-box/ministry-contact-box.component';
import { OrganizationProfileBoxComponent } from './components/organization-profile-box/organization-profile-box.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { ProgramPlannerComponent } from './components/program-planner/program-planner.component';
import { OrganizationProfilePageComponent } from './modules/organization-profile-page/organization-profile-page.component';
import { PersonnelPageComponent } from './modules/personnel-page-DELETEME/personnel-page.component';
import { ProgramPageComponent } from './modules/program-page-DELETEME/program-page.component';
import { StatusReportComponent } from './modules/status-report/status-report.component';
import { SharedModule } from '../shared/shared.module';
import { ExpenseReportComponent } from './modules/expense-report/expense-report.component';
import { ExpenseReportModule } from './modules/expense-report/expense-report.module';
import { ProgramApplicationModule } from '../modules/program-application/program-application.module';
import { StatusReportModule } from './modules/status-report/status-report.module';
import { PersonnelComponent } from './modules/personnel/personnel.component';
import { PersonnelModule } from './modules/personnel/personnel.module';
import { BudgetProposalModule } from '../modules/budget-proposal/budget-proposal.module';


@NgModule({
	imports: [
		CommonModule,
		AuthenticatedRoutingModule,
		SharedModule, // For material components
		ReactiveFormsModule,
		FormsModule,
		NgbModule,

		// modules for this application
		BudgetProposalModule,
		ExpenseReportModule,
		ProgramApplicationModule,
		StatusReportModule,
		PersonnelModule,
	],
	declarations: [
		AuthenticatedComponent,
		NavigationBarComponent,
		DashboardComponent,
		CgLiabilityComponent,
		HoursComponent,
		MinistryContactBoxComponent,
		OrganizationProfileBoxComponent,
		PersonDetailsComponent,
		ProgramPlannerComponent,
		////////////////////////
		DashboardComponent,
		ExpenseReportComponent,
		OrganizationProfilePageComponent,
		PersonnelPageComponent,
		ProgramPageComponent,
		StatusReportComponent,
		PersonnelComponent,
		OrganizationProfilePageComponent,
	]
})
export class AuthenticatedModule { }

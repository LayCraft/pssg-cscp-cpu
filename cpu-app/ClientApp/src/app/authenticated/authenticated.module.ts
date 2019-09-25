import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { AdministrativeInformationComponent } from './components/administrative-information/administrative-information.component';
import { CgLiabilityComponent } from './components/cg-liability/cg-liability.component';
import { HoursComponent } from './components/hours/hours.component';
import { MinistryContactBoxComponent } from './components/ministry-contact-box/ministry-contact-box.component';
import { OrganizationProfileBoxComponent } from './components/organization-profile-box/organization-profile-box.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { ProgramAuthorizerComponent } from './components/program-authorizer/program-authorizer.component';
import { ProgramPlannerComponent } from './components/program-planner/program-planner.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { PersonnelPageComponent } from './pages/personnel-page/personnel-page.component';
import { ProgramPageComponent } from './pages/program-page-DELETEME/program-page.component';
import { StatusReportComponent } from './pages/status-report/status-report.component';
import { SharedModule } from '../shared/shared.module';
import { ProgramApplicationComponent } from './pages/program-application/program-application.component';
import { ExpenseReportComponent } from './pages/expense-report/expense-report.component';
import { BudgetProposalModule } from './pages/budget-proposal/budget-proposal.module';
import { ExpenseReportModule } from './pages/expense-report/expense-report.module';
import { ProgramApplicationModule } from './pages/program-application/program-application.module';
import { StatusReportModule } from './pages/status-report/status-report.module';


@NgModule({
	imports: [
		CommonModule,
		AuthenticatedRoutingModule,
		SharedModule, // For material components
		FormsModule,
		NgbModule,

		BudgetProposalModule,
		ExpenseReportModule,
		ProgramApplicationModule,
		StatusReportModule,
	],
	declarations: [
		AuthenticatedComponent,
		NavigationBarComponent,
		DashboardComponent,
		AdministrativeInformationComponent,
		CgLiabilityComponent,
		ContactInformationComponent,
		HoursComponent,
		MinistryContactBoxComponent,
		OrganizationProfileBoxComponent,
		PersonDetailsComponent,
		ProgramAuthorizerComponent,
		ProgramPlannerComponent,
		////////////////////////
		DashboardComponent,
		ExpenseReportComponent,
		OrganizationProfilePageComponent,
		PersonnelPageComponent,
		ProgramPageComponent,
		StatusReportComponent,
		ProgramApplicationComponent,
	]
})
export class AuthenticatedModule { }

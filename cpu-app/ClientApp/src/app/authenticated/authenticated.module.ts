import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
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
import { ProgramPageComponent } from './pages/program-page/program-page.component';
import { StatusReportPageComponent } from './pages/status-report-page/status-report-page.component';
import { SharedModule } from '../shared/shared.module';
import { ContractTombstoneComponent } from './components/contract-tombstone/contract-tombstone.component';
import { ProgramApplicationComponent } from './pages/program-application/program-application.component';
import { BudgetProposalComponent } from './pages/budget-proposal/budget-proposal.component';
import { ProgramBudgetComponent } from './pages/budget-proposal/program-budget/program-budget.component';
import { ProgramOverviewComponent } from './pages/budget-proposal/program-overview/program-overview.component';
import { ProgramBudgetSummaryComponent } from './pages/budget-proposal/program-budget-summary/program-budget-summary.component';
import { ExpenseReportComponent } from './pages/expense-report/expense-report.component';


@NgModule({
	imports: [
		CommonModule,
		AuthenticatedRoutingModule,
		SharedModule, // For material components
		FormsModule,
		NgbModule,
	],
	declarations: [
		AuthenticatedComponent,
		NavigationBarComponent,
		DashboardPageComponent,
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
		DashboardPageComponent,
		ExpenseReportComponent,
		OrganizationProfilePageComponent,
		PersonnelPageComponent,
		ProgramPageComponent,
		StatusReportPageComponent,
		ContractTombstoneComponent,
		BudgetProposalComponent,
		ProgramBudgetComponent,
		ProgramOverviewComponent,
		ProgramBudgetSummaryComponent,
		ProgramApplicationComponent,
	]
})
export class AuthenticatedModule { }

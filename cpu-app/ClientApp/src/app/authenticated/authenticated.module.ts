import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ContactInformationDeletemeComponent } from './components/contact-information-DELETEME/contact-information-DELETEME.component';
import { AdministrativeInformationComponent } from './components/administrative-information/administrative-information.component';
import { CgLiabilityComponent } from './components/cg-liability/cg-liability.component';
import { HoursComponent } from './components/hours/hours.component';
import { MinistryContactBoxComponent } from './components/ministry-contact-box/ministry-contact-box.component';
import { OrganizationProfileBoxComponent } from './components/organization-profile-box/organization-profile-box.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { ProgramAuthorizerComponent } from './components/program-authorizer/program-authorizer.component';
import { ProgramPlannerComponent } from './components/program-planner/program-planner.component';
import { OrganizationProfilePageComponent } from './modules/organization-profile-page-DELETEME/organization-profile-page.component';
import { PersonnelPageComponent } from './modules/personnel-page-DELETEME/personnel-page.component';
import { ProgramPageComponent } from './modules/program-page-DELETEME/program-page.component';
import { StatusReportComponent } from './modules/status-report/status-report.component';
import { SharedModule } from '../shared/shared.module';
import { ProgramApplicationComponent } from './modules/program-application/program-application.component';
import { ExpenseReportComponent } from './modules/expense-report/expense-report.component';
import { BudgetProposalModule } from './modules/budget-proposal/budget-proposal.module';
import { ExpenseReportModule } from './modules/expense-report/expense-report.module';
import { ProgramApplicationModule } from './modules/program-application/program-application.module';
import { StatusReportModule } from './modules/status-report/status-report.module';
import { PersonnelComponent } from './modules/personnel/personnel.component';
import { OrganizationProfileComponent } from './modules/organization-profile/organization-profile.component';
import { OrganizationProfileModule } from './modules/organization-profile/organization-profile.module';
import { PersonnelModule } from './modules/personnel/personnel.module';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { AddressComponent } from './components/address/address.component';


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
		OrganizationProfileModule,
		PersonnelModule,
	],
	declarations: [
		AuthenticatedComponent,
		NavigationBarComponent,
		DashboardComponent,
		AdministrativeInformationComponent,
		CgLiabilityComponent,
		ContactInformationDeletemeComponent,
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
		PersonnelComponent,
		OrganizationProfileComponent,
		AddressComponent,
	]
})
export class AuthenticatedModule { }

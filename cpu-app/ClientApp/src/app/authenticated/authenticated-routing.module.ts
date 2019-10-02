import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { OrganizationProfilePageComponent } from './modules/organization-profile-page/organization-profile-page.component';
import { PersonnelPageComponent } from './modules/personnel-page-DELETEME/personnel-page.component';
import { ProgramPageComponent } from './modules/program-page-DELETEME/program-page.component';
import { StatusReportComponent } from './modules/status-report/status-report.component';
import { ExpenseReportComponent } from './modules/expense-report/expense-report.component';
import { BudgetProposalComponent } from '../modules/budget-proposal/budget-proposal.component';
import { ProgramApplicationComponent } from '../modules/program-application/program-application.component';


const routes: Routes = [
	{
		path: '',
		component: AuthenticatedComponent,
		children: [
			{
				// set the default component to route to for this user
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				component: DashboardComponent,
			},
			{
				path: 'profile/:organizationId',
				component: OrganizationProfilePageComponent,
			},
			{
				path: 'personnel/:organizationId',
				component: PersonnelPageComponent
			},
			{
				path: 'program_application',
				component: ProgramPageComponent
			},
			{
				path: 'program_application/:organizationId/:contractId',
				component: ProgramApplicationComponent
			},
			{
				path: 'budget_proposal/:organizationId/:contractId',
				component: BudgetProposalComponent
			},
			{
				path: 'status_report/:organizationId/:contractId',
				component: StatusReportComponent
			},
			{
				path: 'expense_report/:organizationId/:contractId',
				component: ExpenseReportComponent
			},
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }

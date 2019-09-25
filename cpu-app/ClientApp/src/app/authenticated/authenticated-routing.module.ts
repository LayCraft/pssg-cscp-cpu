import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { PersonnelPageComponent } from './pages/personnel-page/personnel-page.component';
import { ProgramPageComponent } from './pages/program-page/program-page.component';
import { StatusReportPageComponent } from './pages/status-report-page/status-report-page.component';
import { ProgramApplicationComponent } from './pages/program-application/program-application.component';
import { BudgetProposalComponent } from './pages/budget-proposal/budget-proposal.component';
import { ExpenseReportComponent } from './pages/expense-report/expense-report.component';


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
				component: DashboardPageComponent,
			},
			{
				path: 'profile',
				component: OrganizationProfilePageComponent,
			},
			{
				path: 'personnel',
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
				component: StatusReportPageComponent
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

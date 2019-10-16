import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './authenticated/dashboard/dashboard.component';
import { BudgetProposalComponent } from './authenticated/budget-proposal/budget-proposal.component';
import { ExpenseReportComponent } from './authenticated/expense-report/expense-report.component';
import { ProgramApplicationComponent } from './authenticated/program-application/program-application.component';
import { StatusReportComponent } from './authenticated/status-report/status-report.component';
import { ProfileComponent } from './authenticated/profile/profile.component';
import { PersonnelComponent } from './authenticated/personnel/personnel.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'authenticated',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'budget_proposal', // basic routing and component seems to work
        component: BudgetProposalComponent
      },
      {
        path: 'expense_report', //
        component: ExpenseReportComponent
      },
      {
        path: 'program_application', //
        component: ProgramApplicationComponent
      },
      {
        path: 'status_report', //
        component: StatusReportComponent
      },
      {
        path: 'profile', //
        component: ProfileComponent
      },
      {
        path: 'personnel', //
        component: PersonnelComponent
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // },
  // {
  //   path: 'profile/:organizationId',
  //   component: OrganizationProfilePageComponent,
  // },
  // {
  //   path: 'personnel/:organizationId',
  //   component: PersonnelComponent
  // },
  // {
  //   path: 'program_application/:organizationId/:contractId',
  //   component: ProgramApplicationComponent
  // },
  // {
  //   path: 'budget_proposal/:organizationId/:contractId',
  //   component: BudgetProposalComponent
  // },
  // {
  //   path: 'status_report/:organizationId/:contractId',
  //   component: StatusReportComponent
  // },
  // {
  //   path: 'expense_report/:organizationId/:contractId',
  //   component: ExpenseReportComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

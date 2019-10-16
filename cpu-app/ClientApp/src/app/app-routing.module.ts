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
        path: 'budget_proposal/:contractId', // basic routing and component seems to work
        component: BudgetProposalComponent
      },
      {
        path: 'expense_report/:contractId', //
        component: ExpenseReportComponent
      },
      {
        path: 'program_application/:contractId', // basic routing and component seems to work
        component: ProgramApplicationComponent
      },
      {
        path: 'status_report/:contractId', //
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

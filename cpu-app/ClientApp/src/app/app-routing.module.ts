import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './authenticated/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'authenticated',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
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

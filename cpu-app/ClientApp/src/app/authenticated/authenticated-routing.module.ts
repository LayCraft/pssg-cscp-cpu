import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SecretPageComponent } from './secret-page/secret-page.component';
// import { SecretFormComponent } from './secret-form/secret-form.component';
import { AuthenticatedComponent } from './authenticated.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { PersonnelPageComponent } from './pages/personnel-page/personnel-page.component';
import { ProgramPageComponent } from './pages/program-page/program-page.component';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import { StatusReportPageComponent } from './pages/status-report-page/status-report-page.component';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';


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
        path: 'program_application/:orgid/:id',
        component: ProgramPageComponent
      },
      {
        path: 'budget_proposal/:orgid/:id',
        component: BudgetPageComponent
      },
      {
        path: 'status_report/:orgid/:id',
        component: StatusReportPageComponent
      },
      {
        path: 'expense_report/:orgid/:id',
        component: ExpensePageComponent
      },

      // {
      //   path: 'secret-page',
      //   component: SecretPageComponent
      // },
      // {
      //   path: 'secret-form',
      //   component: SecretFormComponent
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }

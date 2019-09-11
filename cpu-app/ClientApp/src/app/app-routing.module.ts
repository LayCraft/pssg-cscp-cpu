import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RenewApplicationComponent } from './renew-application/renew-application.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProgramPageComponent } from './pages/program-page/program-page.component';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';
import { MonthlyUpdatePageComponent } from './pages/monthly-update-page/monthly-update-page.component';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'renew-application',
    component: RenewApplicationComponent,
    //canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'program_application/:orgid/:progid', //organization id and program id (GUIDs?)
    component: ProgramPageComponent
  },
  {
    path: 'budget_proposal/:orgid/:progid', //organization id and program id (GUIDs?)
    component: BudgetPageComponent
  },
  {
    path: 'monthly_update/:orgid/:progid', //organization id and program id (GUIDs?)
    component: MonthlyUpdatePageComponent
  },
  {
    path: 'expense_report/:orgid/:progid', //organization id and program id (GUIDs?)
    component: ExpensePageComponent
  },
  {
    path: 'profile',
    component: OrganizationProfilePageComponent,
    //canDeactivate: [CanDeactivateGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

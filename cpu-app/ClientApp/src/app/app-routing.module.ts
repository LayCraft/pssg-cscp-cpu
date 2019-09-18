import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProgramPageComponent } from './pages/program-page/program-page.component';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import { StatusReportPageComponent } from './pages/status-report-page/status-report-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PersonnelPageComponent } from './pages/personnel-page/personnel-page.component';

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
  {
    path: 'profile',
    component: OrganizationProfilePageComponent,
    //canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'personnel',
    component: PersonnelPageComponent,
    //canDeactivate: [CanDeactivateGuard]
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

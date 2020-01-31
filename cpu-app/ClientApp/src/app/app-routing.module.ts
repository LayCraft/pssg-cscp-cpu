import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { BudgetProposalComponent } from './authenticated/budget-proposal/budget-proposal.component';
import { DashboardComponent } from './authenticated/dashboard/dashboard.component';
import { ExpenseReportComponent } from './authenticated/expense-report/expense-report.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PersonnelComponent } from './authenticated/personnel/personnel.component';
import { ProfileComponent } from './authenticated/profile/profile.component';
import { ProgramApplicationComponent } from './authenticated/program-application/program-application.component';
import { StatusReportComponent } from './authenticated/status-report/status-report.component';
import { TestComponent } from './test/test.component';
import { NotUserComponent } from './authenticated/not-user/not-user.component';
import { SignContractComponent } from './authenticated/sign-contract/sign-contract.component';
import { CoverLetterComponent } from './authenticated/cover-letter/cover-letter.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'authenticated',
    canActivate: [AuthenticationGuard],
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
        path: 'budget_proposal/:taskId',
        component: BudgetProposalComponent
      },
      {
        path: 'expense_report/:taskId',
        component: ExpenseReportComponent
      },
      {
        path: 'program_application/:taskId',
        component: ProgramApplicationComponent
      },
      {
        path: 'status_report/:taskId',
        component: StatusReportComponent
      },
      {
        path: 'sign_contract/:taskId',
        component: SignContractComponent
      },
      {
        path: 'cover_letter/:taskId',
        component: CoverLetterComponent
      },
      {
        // if there is extra information we redirect to the profile page anyhow.
        path: 'profile/:taskId',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'personnel',
        component: PersonnelComponent
      },
      {
        path: 'new_user',
        component: NotUserComponent
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

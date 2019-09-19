import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { AdministrativeInformationComponent } from './components/administrative-information/administrative-information.component';
import { CgLiabilityComponent } from './components/cg-liability/cg-liability.component';
import { HoursComponent } from './components/hours/hours.component';
import { MinistryContactBoxComponent } from './components/ministry-contact-box/ministry-contact-box.component';
import { OrganizationProfileBoxComponent } from './components/organization-profile-box/organization-profile-box.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { ProgramAuthorizerComponent } from './components/program-authorizer/program-authorizer.component';
import { ProgramPlannerComponent } from './components/program-planner/program-planner.component';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { PersonnelPageComponent } from './pages/personnel-page/personnel-page.component';
import { ProgramPageComponent } from './pages/program-page/program-page.component';
import { StatusReportPageComponent } from './pages/status-report-page/status-report-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProgramBudgetComponent } from './components/program-budget/program-budget.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticatedRoutingModule,
    SharedModule, // For material components
    FormsModule,
    NgbModule,
  ],
  declarations: [
    AuthenticatedComponent,
    NavigationBarComponent,
    DashboardPageComponent,
    AdministrativeInformationComponent,
    CgLiabilityComponent,
    ContactInformationComponent,
    HoursComponent,
    MinistryContactBoxComponent,
    OrganizationProfileBoxComponent,
    PersonDetailsComponent,
    ProgramAuthorizerComponent,
    ProgramPlannerComponent,
    ////////////////////////
    BudgetPageComponent,
    DashboardPageComponent,
    ExpensePageComponent,
    OrganizationProfilePageComponent,
    PersonnelPageComponent,
    ProgramPageComponent,
    StatusReportPageComponent,
    ProgramBudgetComponent,
  ]
})
export class AuthenticatedModule { }

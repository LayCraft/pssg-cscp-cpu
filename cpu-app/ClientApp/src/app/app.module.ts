import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './authenticated/dashboard/dashboard.component';
import { BudgetProposalComponent } from './authenticated/budget-proposal/budget-proposal.component';
import { ExpenseReportComponent } from './authenticated/expense-report/expense-report.component';
import { ProgramApplicationComponent } from './authenticated/program-application/program-application.component';
import { StatusReportComponent } from './authenticated/status-report/status-report.component';
import { PersonnelComponent } from './authenticated/personnel/personnel.component';
import { ProfileComponent } from './authenticated/profile/profile.component';
import { ProgramContactInformationComponent } from './authenticated/subforms/program-contact-information/program-contact-information.component';
import { AdministrativeInformationComponent } from './authenticated/subforms/administrative-information/administrative-information.component';
import { CgLiabilityComponent } from './authenticated/subforms/cg-liability/cg-liability.component';
import { ProgramComponent } from './authenticated/subforms/program/program.component';
import { ReviewApplicationComponent } from './authenticated/subforms/review-application/review-application.component';
import { ProgramAuthorizerComponent } from './authenticated/subforms/program-authorizer/program-authorizer.component';
import { HoursComponent } from './authenticated/subforms/hours/hours.component';
import { ExpenseTableComponent } from './authenticated/subforms/expense-table/expense-table.component';
import { ContractTombstoneComponent } from './authenticated/subforms/contract-tombstone/contract-tombstone.component';
import { OrganizationProfileBoxComponent } from './authenticated/components/organization-profile-box/organization-profile-box.component';
import { ContactInformationComponent } from './authenticated/subforms/contact-information/contact-information.component';
import { AddressComponent } from './authenticated/subforms/address/address.component';
import { PersonPickerComponent } from './authenticated/subforms/person-picker/person-picker.component';
import { PersonPickerListComponent } from './authenticated/subforms/person-picker-list/person-picker-list.component';
import { MinistryContactBoxComponent } from './authenticated/components/ministry-contact-box/ministry-contact-box.component';
import { PersonEditorComponent } from './authenticated/subforms/person-editor/person-editor.component';
import { TestComponent } from './test/test.component';
import { ProgramBudgetComponent } from './authenticated/subforms/program-budget/program-budget.component';
import { RevenueSourceTableComponent } from './authenticated/subforms/revenue-source-table/revenue-source-table.component';
import { TaskListComponent } from './authenticated/components/task-list/task-list.component';
import { PersonCardComponent } from './authenticated/subforms/person-card/person-card.component';
import { Address2Component } from './authenticated/subforms/address2/address2.component';


@NgModule({
  declarations: [
    AdministrativeInformationComponent,
    AppComponent,
    BudgetProposalComponent,
    CgLiabilityComponent,
    ContractTombstoneComponent,
    DashboardComponent,
    ExpenseReportComponent,
    ExpenseTableComponent,
    HoursComponent,
    LandingPageComponent,
    OrganizationProfileBoxComponent,
    PersonnelComponent,
    ProfileComponent,
    ProgramApplicationComponent,
    ProgramAuthorizerComponent,
    ProgramComponent,
    ProgramContactInformationComponent,
    ReviewApplicationComponent,
    StatusReportComponent,
    ContactInformationComponent,
    AddressComponent,
    PersonPickerComponent,
    PersonPickerListComponent,
    MinistryContactBoxComponent,
    PersonEditorComponent,
    TestComponent,
    ProgramBudgetComponent,
    RevenueSourceTableComponent,
    TaskListComponent,
    PersonCardComponent,
    Address2Component,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],

  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Address2Component } from './authenticated/subforms/address2/address2.component';
import { AddressComponent } from './authenticated/subforms/address/address.component';
import { AdministrativeInformationComponent } from './authenticated/subforms/administrative-information/administrative-information.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BudgetProposalComponent } from './authenticated/budget-proposal/budget-proposal.component';
import { CgLiabilityComponent } from './authenticated/subforms/cg-liability/cg-liability.component';
import { ContactInformationComponent } from './authenticated/subforms/contact-information/contact-information.component';
import { ContractTombstoneComponent } from './authenticated/subforms/contract-tombstone/contract-tombstone.component';
import { DashboardComponent } from './authenticated/dashboard/dashboard.component';
import { ExpenseReportComponent } from './authenticated/expense-report/expense-report.component';
import { ExpenseTableComponent } from './authenticated/subforms/expense-table/expense-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoursComponent } from './authenticated/subforms/hours/hours.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MinistryContactBoxComponent } from './authenticated/components/ministry-contact-box/ministry-contact-box.component';
import { OrganizationProfileBoxComponent } from './authenticated/components/organization-profile-box/organization-profile-box.component';
import { PersonCardComponent } from './authenticated/subforms/person-card/person-card.component';
import { PersonEditorComponent } from './authenticated/subforms/person-editor/person-editor.component';
import { PersonPickerComponent } from './authenticated/subforms/person-picker/person-picker.component';
import { PersonPickerListComponent } from './authenticated/subforms/person-picker-list/person-picker-list.component';
import { PersonTableComponent } from './authenticated/subforms/person-table/person-table.component';
import { PersonnelComponent } from './authenticated/personnel/personnel.component';
import { ProfileComponent } from './authenticated/profile/profile.component';
import { ProgramApplicationComponent } from './authenticated/program-application/program-application.component';
import { ProgramAuthorizerComponent } from './authenticated/subforms/program-authorizer/program-authorizer.component';
import { ProgramComponent } from './authenticated/subforms/program/program.component';
import { ProgramContactInformationComponent } from './authenticated/subforms/program-contact-information/program-contact-information.component';
import { ProgramSummaryTableComponent } from './authenticated/subforms/program-summary-table/program-summary-table.component';
import { RevenueSourceTableComponent } from './authenticated/subforms/revenue-source-table/revenue-source-table.component';
import { ReviewApplicationComponent } from './authenticated/subforms/review-application/review-application.component';
import { SharedModule } from './shared/shared.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { StatusReportComponent } from './authenticated/status-report/status-report.component';
import { TaskListComponent } from './authenticated/components/task-list/task-list.component';
import { TestComponent } from './test/test.component';
import { PersonnelExpenseTableComponent } from './authenticated/subforms/personnel-expense-table/personnel-expense-table.component';
import { ProgramBudgetComponent } from './authenticated/subforms/program-budget/program-budget.component';


@NgModule({
  declarations: [
    Address2Component,
    AddressComponent,
    AdministrativeInformationComponent,
    AppComponent,
    BudgetProposalComponent,
    CgLiabilityComponent,
    ContactInformationComponent,
    ContractTombstoneComponent,
    DashboardComponent,
    ExpenseReportComponent,
    ExpenseTableComponent,
    HoursComponent,
    LandingPageComponent,
    MinistryContactBoxComponent,
    OrganizationProfileBoxComponent,
    PersonCardComponent,
    PersonEditorComponent,
    PersonPickerComponent,
    PersonPickerListComponent,
    PersonTableComponent,
    PersonnelComponent,
    ProfileComponent,
    ProgramApplicationComponent,
    ProgramAuthorizerComponent,
    ProgramComponent,
    ProgramContactInformationComponent,
    ProgramSummaryTableComponent,
    RevenueSourceTableComponent,
    ReviewApplicationComponent,
    StatusReportComponent,
    TaskListComponent,
    TestComponent,
    PersonnelExpenseTableComponent,
    ProgramBudgetComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    SignaturePadModule
  ],

  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

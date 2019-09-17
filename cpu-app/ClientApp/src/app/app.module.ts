import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { AppComponent } from './app.component';
//import { DynamicsDataService } from './services/dynamics-data.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { HomeComponent } from './home/home.component';
import { VersionInfoDataService } from './services/version-info-data.service';
import { SignPadDialog } from './shared/components/sign-dialog/sign-dialog.component';
import { CancelApplicationDialog } from './shared/components/cancel-dialog/cancel-dialog.component';
import { DeactivateGuardDialog } from './shared/components/guard-dialog/guard-dialog.component';
import { FileUploaderBoxComponent } from './shared/components/file-uploader-box/file-uploader-box.component';
import { TestComponent } from './test/test.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgBusyModule } from 'ng-busy';
import { BsDatepickerModule, AlertModule } from 'ngx-bootstrap';
import { FieldComponent } from './shared/components/field/field.component';
import { QuickExitComponent } from './shared/components/quick-exit/quick-exit.component';
import { VersionInfoDialog } from './shared/components/version-info/version-info.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ProgramPlannerComponent } from './components/program-planner/program-planner.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProgramPageComponent } from './pages/program-page/program-page.component';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';
import { StatusReportPageComponent } from './pages/status-report-page/status-report-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { OrganizationProfileBoxComponent } from './components/organization-profile-box/organization-profile-box.component';
import { MinistryContactBoxComponent } from './components/ministry-contact-box/ministry-contact-box.component';
import { PersonnelPageComponent } from './pages/personnel-page/personnel-page.component';
import { AdministrativeInformationComponent } from './components/administrative-information/administrative-information.component';
import { CgLiabilityComponent } from './components/cg-liability/cg-liability.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { HoursComponent } from './components/hours/hours.component';
import { ProgramAuthorizerComponent } from './components/program-authorizer/program-authorizer.component';

@NgModule({
  declarations: [
    AppComponent,
    SignPadDialog,
    CancelApplicationDialog,
    DeactivateGuardDialog,
    FileUploaderBoxComponent,
    TestComponent,
    HomeComponent,
    NotFoundPageComponent,
    FieldComponent,
    QuickExitComponent,
    VersionInfoDialog,
    ContactInformationComponent,
    ProgramPlannerComponent,
    OrganizationProfilePageComponent,
    DashboardPageComponent,
    ProgramPageComponent,
    BudgetPageComponent,
    ExpensePageComponent,
    StatusReportPageComponent,
    HeaderComponent,
    FooterComponent,
    OrganizationProfileBoxComponent,
    MinistryContactBoxComponent,
    PersonnelPageComponent,
    AdministrativeInformationComponent,
    CgLiabilityComponent,
    PersonDetailsComponent,
    HoursComponent,
    ProgramAuthorizerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgBusyModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    SignaturePadModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    TooltipModule,
    MatTooltipModule
  ],
  providers: [
    CookieService,
    CanDeactivateGuard,
    Title,
    VersionInfoDataService,
  ],
  entryComponents: [
    VersionInfoDialog,
    SignPadDialog,
    CancelApplicationDialog,
    DeactivateGuardDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

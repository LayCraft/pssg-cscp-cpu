import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
import { NotFoundComponent } from './not-found/not-found.component';
import { SignPadDialog } from './sign-dialog/sign-dialog.component';
import { CancelApplicationDialog } from './shared/cancel-dialog/cancel-dialog.component';
import { DeactivateGuardDialog } from './shared/guard-dialog/guard-dialog.component';
import { RenewApplicationComponent } from './renew-application/renew-application.component';
import { FileUploaderBoxComponent } from './file-uploader-box/file-uploader-box.component';
import { TestComponent } from './test/test.component';
import { FileDropModule } from 'ngx-file-drop';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FileUploaderComponent } from './shared/file-uploader/file-uploader.component';
import { NgBusyModule } from 'ng-busy';
import { BsDatepickerModule, AlertModule } from 'ngx-bootstrap';
import { FieldComponent } from './shared/field/field.component';
import { QuickExitComponent } from './quick-exit/quick-exit.component';
import { VersionInfoDialog } from './version-info/version-info.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ApplicantContactInformationComponent } from './components/applicant-contact-information/applicant-contact-information.component';
import { ProgramPlannerComponent } from './components/program-planner/program-planner.component';
import { OrganizationProfilePageComponent } from './pages/organization-profile-page/organization-profile-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProgramPageComponent } from './pages/program-page/program-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignPadDialog,
    CancelApplicationDialog,
    DeactivateGuardDialog,
    RenewApplicationComponent,
    FileUploaderBoxComponent,
    TestComponent,
    HomeComponent,
    NotFoundComponent,
    FileUploaderComponent,
    FieldComponent,
    QuickExitComponent,
    VersionInfoDialog,
    ApplicantContactInformationComponent,
    ProgramPlannerComponent,
    OrganizationProfilePageComponent,
    DashboardPageComponent,
    ProgramPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
    FileDropModule,
    SignaturePadModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
    FileDropModule,
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

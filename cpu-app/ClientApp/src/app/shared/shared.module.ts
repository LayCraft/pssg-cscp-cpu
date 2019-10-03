import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './components/address/address.component';
import { AdministrativeInformationComponent } from './components/administrative-information/administrative-information.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { ContractTombstoneComponent } from './components/contract-tombstone/contract-tombstone.component';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { IconStepperComponent } from './components/icon-stepper/icon-stepper.component';
import { MatStepperModule, MatCheckboxModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationBannerComponent } from './components/notification-banner/notification-banner.component';
import { ProgramAuthorizerComponent } from './components/program-authorizer/program-authorizer.component';
import { RevenueSourceTableComponent } from './components/revenue-source-table/revenue-source-table.component';

@NgModule({
	declarations: [
		AddressComponent,
		AdministrativeInformationComponent,
		ContactInformationComponent,
		ContractTombstoneComponent,
		ExpenseTableComponent,
		FooterComponent,
		HeaderComponent,
		IconStepperComponent,
		NotFoundComponent,
		NotificationBannerComponent,
		ProgramAuthorizerComponent,
		RevenueSourceTableComponent,
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
	],
	exports: [
		AddressComponent,
		AdministrativeInformationComponent,
		ContactInformationComponent,
		ContractTombstoneComponent,
		ExpenseTableComponent,
		FooterComponent,
		HeaderComponent,
		IconStepperComponent,
		NotFoundComponent,
		NotificationBannerComponent,
		ProgramAuthorizerComponent,
		RevenueSourceTableComponent,
	]
})
export class SharedModule { }

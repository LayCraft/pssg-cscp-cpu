import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationBannerComponent } from './components/notification-banner/notification-banner.component';
import { MatStepperModule, MatCheckboxModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconStepperComponent } from './components/icon-stepper/icon-stepper.component';
import { ContractTombstoneComponent } from './components/contract-tombstone/contract-tombstone.component';
import { RevenueSourceTableComponent } from './components/revenue-source-table/revenue-source-table.component';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';
import { ProgramAuthorizerComponent } from './components/program-authorizer/program-authorizer.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { AddressComponent } from './components/address/address.component';
import { AdministrativeInformationComponent } from './components/administrative-information/administrative-information.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		NotFoundComponent,
		NotificationBannerComponent,
		IconStepperComponent,
		ContractTombstoneComponent,
		RevenueSourceTableComponent,
		ExpenseTableComponent,
		ProgramAuthorizerComponent,
		ContactInformationComponent,
		AddressComponent,
		AdministrativeInformationComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatStepperModule,
		MatCheckboxModule,
		MatSlideToggleModule,
		MatIconModule,
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		NotFoundComponent,
		NotificationBannerComponent,
		IconStepperComponent,
		ContractTombstoneComponent,
		RevenueSourceTableComponent,
		ExpenseTableComponent,
		ProgramAuthorizerComponent,
		ContactInformationComponent,
		AddressComponent,
		AdministrativeInformationComponent,

		// Material exports
		MatStepperModule,
		MatCheckboxModule,
		MatSlideToggleModule,
		MatIconModule,
	]
})
export class SharedModule { }

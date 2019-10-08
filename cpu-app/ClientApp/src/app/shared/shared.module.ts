import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './components/address/address.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { ContractTombstoneComponent } from './components/contract-tombstone/contract-tombstone.component';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { IconStepperComponent } from './components/icon-stepper/icon-stepper.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationBannerComponent } from './components/notification-banner/notification-banner.component';
import { ProgramAuthorizerComponent } from './components/program-authorizer/program-authorizer.component';
import { RevenueSourceTableComponent } from './components/revenue-source-table/revenue-source-table.component';
import { HoursComponent } from './components/hours/hours.component';
import { PersonPickerComponent } from './person-picker/person-picker.component';

@NgModule({
	declarations: [
		AddressComponent,
		ContactInformationComponent,
		ContractTombstoneComponent,
		ExpenseTableComponent,
		FooterComponent,
		HeaderComponent,
		HoursComponent,
		IconStepperComponent,
		NotFoundComponent,
		NotificationBannerComponent,
		ProgramAuthorizerComponent,
		RevenueSourceTableComponent,
		PersonPickerComponent,
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
	],
	exports: [
		AddressComponent,
		ContactInformationComponent,
		ContractTombstoneComponent,
		ExpenseTableComponent,
		FooterComponent,
		HeaderComponent,
		HoursComponent,
		IconStepperComponent,
		NotFoundComponent,
		NotificationBannerComponent,
		ProgramAuthorizerComponent,
		RevenueSourceTableComponent,
	]
})
export class SharedModule { }

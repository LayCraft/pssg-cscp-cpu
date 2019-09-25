import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationBannerComponent } from './components/notification-banner/notification-banner.component';
import { MatStepperModule, MatCheckboxModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { IconStepperComponent } from './components/icon-stepper/icon-stepper.component';
import { ContractTombstoneComponent } from './components/contract-tombstone/contract-tombstone.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		NotFoundComponent,
		NotificationBannerComponent,
		IconStepperComponent,
		ContractTombstoneComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
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

		// Material exports
		MatStepperModule,
		MatCheckboxModule,
		MatSlideToggleModule,
		MatIconModule,
	]
})
export class SharedModule { }

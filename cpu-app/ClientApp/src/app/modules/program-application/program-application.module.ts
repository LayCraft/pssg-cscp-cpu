import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgramApplicationComponent } from './program-application.component';
import { CgLiabilityComponent } from './cg-liability/cg-liability.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { AdministrativeInformationComponent } from './administrative-information/administrative-information.component';



@NgModule({
	declarations: [
		ProgramApplicationComponent,
		CgLiabilityComponent,
		ContactInformationComponent,
		AdministrativeInformationComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		ProgramApplicationComponent
	]
})
export class ProgramApplicationModule { }

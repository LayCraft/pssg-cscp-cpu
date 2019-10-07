import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgramApplicationComponent } from './program-application.component';
import { CgLiabilityComponent } from './cg-liability/cg-liability.component';
import { AdministrativeInformationComponent } from './administrative-information/administrative-information.component';
import { ReviewApplicationComponent } from './review-application/review-application.component';
import { ProgramComponent } from './program/program.component';
import { ProgramContactInformationComponent } from './program-contact-information/program-contact-information.component';
import { ProgramAdministrativeInformationComponent } from './program-administrative-information/program-administrative-information.component';



@NgModule({
	declarations: [
		ProgramApplicationComponent,
		CgLiabilityComponent,
		AdministrativeInformationComponent,
		ReviewApplicationComponent,
		ProgramComponent,
		ProgramContactInformationComponent,
		ProgramAdministrativeInformationComponent
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

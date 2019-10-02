import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgramApplicationComponent } from './program-application.component';



@NgModule({
	declarations: [
		ProgramApplicationComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
		ProgramApplicationComponent
	]
})
export class ProgramApplicationModule { }

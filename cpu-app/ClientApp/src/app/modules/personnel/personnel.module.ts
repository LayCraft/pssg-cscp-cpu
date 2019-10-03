import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelComponent } from './personnel.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
	declarations: [
		PersonnelComponent
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		PersonnelComponent
	]
})
export class PersonnelModule { }

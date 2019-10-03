import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelComponent } from './personnel.component';



@NgModule({
	declarations: [
		PersonnelComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		PersonnelComponent
	]
})
export class PersonnelModule { }

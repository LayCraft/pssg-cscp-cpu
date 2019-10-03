import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelComponent } from './personnel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonEditorComponent } from './person-editor/person-editor.component';



@NgModule({
	declarations: [
		PersonnelComponent,
		PersonEditorComponent
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

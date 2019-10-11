import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelComponent } from './personnel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonEditorComponent } from './person-editor/person-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		PersonnelComponent,
		PersonEditorComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		PersonnelComponent
	]
})
export class PersonnelModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusReportComponent } from './status-report.component';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		StatusReportComponent
	],
	imports: [
		CommonModule,
		FormsModule,
	],
	exports: [
		StatusReportComponent
	]
})
export class StatusReportModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseReportComponent } from './expense-report.component';



@NgModule({
	declarations: [
		ExpenseReportComponent
	],
	imports: [
		CommonModule,
	],
	exports: [
		ExpenseReportComponent
	]
})
export class ExpenseReportModule { }

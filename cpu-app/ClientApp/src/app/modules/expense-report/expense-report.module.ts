import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseReportComponent } from './expense-report.component';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		ExpenseReportComponent
	],
	imports: [
		CommonModule,
		FormsModule,
	],
	exports: [
		ExpenseReportComponent
	]
})
export class ExpenseReportModule { }

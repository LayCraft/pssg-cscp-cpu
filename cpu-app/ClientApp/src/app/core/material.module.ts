import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatIconModule, MatSlideToggleModule, MatStepperModule, MatStep } from '@angular/material';

// This module exports all of the angular material components we need.
// To use the material components, this must be imported as a module in the module you are working in.
@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatCheckboxModule,
		MatIconModule,
		MatSlideToggleModule,
		MatStepperModule,
	],
	exports: [
		MatCheckboxModule,
		MatIconModule,
		MatSlideToggleModule,
		MatStepperModule,
		MatStep,
	]
})
export class MaterialModule { }

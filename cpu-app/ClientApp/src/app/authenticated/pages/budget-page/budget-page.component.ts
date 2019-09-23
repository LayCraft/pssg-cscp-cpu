import { Component, OnInit } from '@angular/core';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { MatStepper } from '@angular/material';
import { AdministrativeInformation, iAdministrativeInformation } from 'src/app/core/models/administrative-information.class';
import { iProgramMeta } from 'src/app/core/models/program-information.class';
import { BoilerplateService } from 'src/app/core/services/boilerplate.service';
import { ProgramInformationService } from 'src/app/core/services/program-information.service';
import { ActivatedRoute } from '@angular/router';
import { iIconStepperElement } from 'src/app/shared/components/icon-stepper/icon-stepper.component';

@Component({
	selector: 'app-budget-page',
	templateUrl: './budget-page.component.html',
	styleUrls: ['./budget-page.component.scss']
})
export class BudgetPageComponent implements OnInit {


	contractId: string;
	organizationId: string;
	pageList: string[];

	upperItems: string[] = ['Program Overview'];
	programs: string[] = [];
	programMeta: iProgramMeta[];
	lowerItems: string[] = ['Program Budget Summary', 'Authorization'];
	combinedPageList: string[];

	iconStepperElements: iIconStepperElement[];
	// 	= [
	// 	{
	// 		itemName: 'Program Overview',
	// 		navigationName: 'program-overview',
	// 		level: 'untouched'
	// 	},
	// 	{
	// 		itemName: 'Program Budget Summary',
	// 		navigationName: 'incomplete-item',
	// 		level: 'incomplete'
	// 	},
	// 	{
	// 		itemName: 'Authorization',
	// 		navigationName: 'invalid-item',
	// 		level: 'invalid'
	// 	},
	// 	{
	// 		itemName: 'This is the third form',
	// 		navigationName: 'treefer-item',
	// 		level: 'complete'
	// 	}
	// ];

	currentFormPage: string = '';
	canSubmit: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private programInformationService: ProgramInformationService,
		private boilerplateService: BoilerplateService,
	) { }

	ngOnInit() {
		// TODO: the majority of the work here is too figure out how to get the data back from dynamics.

		// collect the ids for looking up the program from the route.
		this.organizationId = this.route.snapshot.paramMap.get('orgid');
		this.contractId = this.route.snapshot.paramMap.get('id');

		this.iconStepperElements = [
			{
				itemName: 'Program Overview',
				level: 'untouched'
			},
			{
				itemName: 'Program Budget Summary',
				level: 'incomplete'
			},
			{
				itemName: 'Authorization',
				level: 'invalid'
			},
			{
				itemName: 'This is the third form',
				level: 'complete'
			}
		];
	}
}

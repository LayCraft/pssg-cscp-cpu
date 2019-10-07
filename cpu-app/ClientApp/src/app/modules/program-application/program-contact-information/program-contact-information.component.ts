import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iAnnualProgramApplication } from 'src/app/core/models/program-application.class';
import { iContactInformation } from 'src/app/core/models/contact-information.class';

@Component({
	selector: 'app-program-contact-information',
	templateUrl: './program-contact-information.component.html',
	styleUrls: ['./program-contact-information.component.scss']
})
export class ProgramContactInformationComponent implements OnInit {
	// this collects all of the information for all programs so we are actually collecting parent data
	// we should patch it into the data on change
	@Input() contactInformation: iContactInformation;
	@Output() contactInformationChange = new EventEmitter<iContactInformation>();
	constructor() { }

	ngOnInit() {
	}

}

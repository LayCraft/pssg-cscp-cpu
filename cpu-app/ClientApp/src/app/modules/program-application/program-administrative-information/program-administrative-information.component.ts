import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iAdministrativeInformation } from 'src/app/core/models/administrative-information.class';

@Component({
	selector: 'app-program-administrative-information',
	templateUrl: './program-administrative-information.component.html',
	styleUrls: ['./program-administrative-information.component.scss']
})
export class ProgramAdministrativeInformationComponent implements OnInit {
	@Input() administrativeInformation: iAdministrativeInformation;
	@Output() administrativeInformationChange = new EventEmitter<iAdministrativeInformation>();

	constructor() { }
	ngOnInit() { }

}

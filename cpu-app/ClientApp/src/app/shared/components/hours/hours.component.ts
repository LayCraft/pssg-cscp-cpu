import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hours } from 'src/app/core/models/program-application.class';
import { uuidv4 } from 'src/app/core/constants/uuidv4';
@Component({
	selector: 'app-hours',
	templateUrl: './hours.component.html',
	styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {
	@Input() hours: Hours;
	@Output() hoursChange = new EventEmitter<Hours>();
	@Input() title: string = 'Hours (24hr)';
	uuid: string;
	constructor() { }

	ngOnInit() {
		this.uuid = uuidv4();
	}

}

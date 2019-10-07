import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iProgramApplication } from 'src/app/core/models/program-application.class';

@Component({
	selector: 'app-program',
	templateUrl: './program.component.html',
	styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
	@Input() programApplication: iProgramApplication;
	@Output() programApplicationChange = new EventEmitter<iProgramApplication>();

	constructor() { }
	ngOnInit() { }

}

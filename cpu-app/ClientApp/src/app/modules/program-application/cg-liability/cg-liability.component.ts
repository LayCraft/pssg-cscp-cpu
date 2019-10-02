import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-cg-liability',
	templateUrl: './cg-liability.component.html',
	styleUrls: ['./cg-liability.component.scss']
})
export class CgLiabilityComponent implements OnInit {
	@Input() cgLiability: boolean;
	@Output() cgLiabilityChange = new EventEmitter<boolean>();
	constructor() { }

	ngOnInit() {
	}

	onChanges() {
		this.cgLiabilityChange.emit(this.cgLiability);
	}
}

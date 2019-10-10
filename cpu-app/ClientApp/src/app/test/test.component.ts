import { Component, OnInit } from '@angular/core';
import { TestService } from '../core/services/test.service';
@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	test: any;
	constructor(
		private testService: TestService
	) { }

	ngOnInit() { }
	onClick() {
		this.testService.getTest().subscribe(
			x => this.test = x,
			err => console.log(err),
			() => console.log('Finished')
		);
	}
}

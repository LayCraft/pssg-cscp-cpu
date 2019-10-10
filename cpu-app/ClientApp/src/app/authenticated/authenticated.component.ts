import { Component, OnInit } from '@angular/core';
import { StateService } from '../core/services/state.service';
import { PersonService } from '../core/services/person.service';
import { iPerson } from '../core/models/person.class';

@Component({
	selector: 'app-authenticated',
	templateUrl: './authenticated.component.html',
	styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {

	constructor(
		private stateService: StateService,
		private personService: PersonService,
	) { }

	ngOnInit() {
		this.personService.getPersons('organization id foobar')
			.subscribe((p: iPerson[]) => {
				this.stateService.organizationStaff.next(p);
			});
		// this.stateService.organizationStaff.		
	}

}

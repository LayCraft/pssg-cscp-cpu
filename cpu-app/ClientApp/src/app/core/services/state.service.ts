import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iPerson } from '../models/person.class';
import { iContactInformation } from '../models/contact-information.class';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	// these are observable states for the application load these in at login time.
	organizationContactInformation: BehaviorSubject<iContactInformation> = new BehaviorSubject<iContactInformation>(null);
	organizationId: BehaviorSubject<string> = new BehaviorSubject(null);
	organizationName: BehaviorSubject<string> = new BehaviorSubject(null);
	organizationStaff: BehaviorSubject<iPerson[]> = new BehaviorSubject([]);
	constructor() { }
}

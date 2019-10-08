import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson } from 'src/app/core/models/person.class';

@Component({
	selector: 'app-person-picker-list',
	templateUrl: './person-picker-list.component.html',
	styleUrls: ['./person-picker-list.component.scss']
})
export class PersonPickerListComponent implements OnInit {
	@Input() persons: iPerson[];
	@Output() personsChange = new EventEmitter<iPerson[]>();
	constructor() { }

	personList: iPerson[] = [];
	personIdList: string[] = []; // this is all of the selected elements

	ngOnInit() {
		// collect the properties of the person but not the object itself (Spread syntax)
		for (let person of this.persons) {
			this.personList.push({ ...person });
		}
	}
	onInput() {
		// use let to prevent overwriting
		let collectPersons = this.personList.filter(p => {
			// if the person's id is in the personIdList we keep it otherwise we omit it.
			if (this.personIdList.indexOf(p.personId) >= 0) {
				return true;
			} else {
				return false;
			}
		});
		this.personsChange.emit(collectPersons);
	}
	addPerson(id: string) {
		// if the item is not in the list we add it
		if (this.personIdList.indexOf(id) === -1) {
			this.personIdList.push(id);
		}
		this.onInput();
	}
	removePerson(id: string) {
		// even doing a check for the value in the array is O(n) so I'll just filter it.
		// filter out any matching values
		this.personIdList = this.personIdList.filter(p => {
			if (p === id) {
				// we do not want a matching one
				return false;
			} else {
				return true;
			}
		});
		this.onInput();
	}
}

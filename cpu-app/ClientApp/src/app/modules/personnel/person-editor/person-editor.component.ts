import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson, Person } from 'src/app/core/models/person.class';

@Component({
	selector: 'app-person-editor',
	templateUrl: './person-editor.component.html',
	styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent implements OnInit {
	@Input() person: iPerson;
	@Output() personChange = new EventEmitter<iPerson>();

	constructor() { }

	ngOnInit() {
		this.person = new Person(this.person);
	}
	onChanges() {
		this.personChange.emit(this.person);
	}

}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson } from '../../../core/models/person.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
@Component({
  selector: 'app-person-picker-list',
  templateUrl: './person-picker-list.component.html',
  styleUrls: ['./person-picker-list.component.scss']
})
export class PersonPickerListComponent implements OnInit {
  @Input() label = "Select all people who apply."
  @Input() persons: iPerson[] = []; // the list from the service
  @Output() personsChange = new EventEmitter<iPerson[]>();
  public nameAssemble = nameAssemble;
  trans: Transmogrifier;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.main.subscribe((m: Transmogrifier) => this.trans = m);
  }
  addPerson(personId: string) {
    const person: iPerson = this.persons.filter(p => p.personId === personId)[0] || null;
    // only add someone if they are not in there already
    if (!person) {
      // the person is not in the list so we add them
      this.persons.push(person);
      this.personsChange.emit(this.persons);
    }
  }
  removePerson(personId: string) {
    this.persons = this.persons.filter(p => p.personId !== personId);
    this.personsChange.emit(this.persons);
  }
}

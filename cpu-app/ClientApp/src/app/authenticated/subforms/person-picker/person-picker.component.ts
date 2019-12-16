import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPerson } from '../../../core/models/person.class';
import { nameAssemble } from '../../../core/constants/name-assemble';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';

@Component({
  selector: 'app-person-picker',
  templateUrl: './person-picker.component.html',
  styleUrls: ['./person-picker.component.scss']
})
export class PersonPickerComponent implements OnInit {
  // this is a person form control that uses template binding.

  @Input() title = 'Select Person';
  @Input() person: iPerson;
  @Output() personChange = new EventEmitter<iPerson>();
  @Input() showCard = true;
  public nameAssemble = nameAssemble;
  persons: iPerson[];

  constructor(
    private stateService: StateService,
  ) { }
  ngOnInit() {
    // make a new person object from what was handed to this picker.
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.persons = m.persons;
    });
  }

  onChange() {
    // console.log(this.person);
    this.personChange.emit(this.person);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../../../core/models/person.class';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { iPerson } from '../../../core/models/person.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';

@Component({
  selector: 'app-person-picker',
  templateUrl: './person-picker.component.html',
  styleUrls: ['./person-picker.component.scss']
})
export class PersonPickerComponent implements OnInit {
  // this is a person form control that uses template binding.

  @Input() title = 'Select Person';
  @Input() person: iPerson = new Person();
  @Output() personChange = new EventEmitter<iPerson>();
  @Input() showCard = true;
  public nameAssemble = nameAssemble;
  trans: Transmogrifier;

  constructor(
    private stateService: StateService,
  ) { }
  ngOnInit() {
    // make a new person object from what was handed to this picker.
    this.stateService.main.subscribe((m: Transmogrifier) => this.trans = m);
  }

  onChange() {
    // console.log(this.person);
    this.personChange.emit(this.person);
  }
}

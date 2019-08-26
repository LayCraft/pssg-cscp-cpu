import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgramInformation } from '../interfaces/program-information.class';
@Component({
  selector: 'app-program-planner',
  templateUrl: './program-planner.component.html',
  styleUrls: ['./program-planner.component.scss']
})
export class ProgramPlannerComponent implements OnInit {
  @Input() program: string;
  @Output() pageTurn = new EventEmitter<string>();

  // the form object
  programInfo: ProgramInformation;
  constructor() { }

  ngOnInit() {
    // when the component loads make a new working contact information object to do the form work in
    this.programInfo = new ProgramInformation();
    // this should be a service call to get previous program information

  }
  onSubmit() {
    this.pageTurn.emit('The program planner component requested a page turn.');
  }
}

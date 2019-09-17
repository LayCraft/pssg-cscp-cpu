import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hours } from '../../classes/program-information.class';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {
  @Input() hours: Hours;
  @Output() hoursChange = new EventEmitter<Hours>();
  constructor() { }

  ngOnInit() {
  }

}

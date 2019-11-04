import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { uuidv4 } from '../../../core/constants/uuidv4';
import { Hours } from '../../../core/models/hours.class';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {
  @Input() hours: Hours;
  @Output() hoursChange = new EventEmitter<Hours>();
  @Input() title: string = 'Hours (24hr)';
  uuid: string;
  constructor() { }

  ngOnInit() {
    this.uuid = uuidv4();
  }
}

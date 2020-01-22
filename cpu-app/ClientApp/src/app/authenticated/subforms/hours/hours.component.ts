import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { uuidv4 } from '../../../core/constants/uuidv4';
import { iHours } from '../../../core/models/hours.interface';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {
  @Input() hours: iHours;
  @Output() hoursChange = new EventEmitter<iHours>();
  @Input() title: string = 'Hours';
  uuid: string;
  constructor() { }

  ngOnInit() {
    this.uuid = uuidv4();
  }
}

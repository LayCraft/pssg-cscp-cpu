import { Component, OnInit, Input } from '@angular/core';
import { iMessage } from '../../../core/models/message.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';

@Component({
  selector: 'message-read-card',
  templateUrl: './message-read.component.html',
  styleUrls: ['./message-read.component.css']
})
export class MessageReadComponent implements OnInit {
  @Input() message: iMessage;
  nameAssemble = nameAssemble;
  constructor() { }

  ngOnInit() {
  }

}

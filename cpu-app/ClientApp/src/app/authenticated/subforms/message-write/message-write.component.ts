import { Component, OnInit, Input } from '@angular/core';
import { iMessage } from '../../../core/models/message.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';

@Component({
  selector: 'message-write-card',
  templateUrl: './message-write.component.html',
  styleUrls: ['./message-write.component.css']
})
export class MessageWriteComponent implements OnInit {
  @Input() message: iMessage;
  nameAssemble = nameAssemble;
  constructor() { }

  ngOnInit() {
  }

}

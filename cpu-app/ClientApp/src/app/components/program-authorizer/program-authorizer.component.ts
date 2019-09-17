import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-program-authorizer',
  templateUrl: './program-authorizer.component.html',
  styleUrls: ['./program-authorizer.component.scss']
})
export class ProgramAuthorizerComponent implements OnInit {
  @Output() unlock = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

}

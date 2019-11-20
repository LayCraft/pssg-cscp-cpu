import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { nameAssemble } from '../../../core/constants/name-assemble';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';

@Component({
  selector: 'app-ministry-contact-box',
  templateUrl: './ministry-contact-box.component.html',
  styleUrls: ['./ministry-contact-box.component.css']
})
export class MinistryContactBoxComponent implements OnInit {
  trans: Transmogrifier;
  nameAssemble = nameAssemble;
  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.stateService.main.subscribe(main => this.trans = main);
  }
}

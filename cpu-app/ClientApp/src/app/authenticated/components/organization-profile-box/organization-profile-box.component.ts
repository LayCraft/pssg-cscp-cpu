import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { Transmogrifier } from '../../../core/models/transmogrifier.class';
import { nameAssemble } from '../../../core/constants/name-assemble';
import { iProgramApplication } from '../../../core/models/program-application.interface';

@Component({
  selector: 'app-organization-profile-box',
  templateUrl: './organization-profile-box.component.html',
  styleUrls: ['./organization-profile-box.component.scss']
})
export class OrganizationProfileBoxComponent implements OnInit {
  @Input() type: string;
  @Input() programInfo: iProgramApplication;
  public nameAssemble = nameAssemble;
  trans: Transmogrifier;
  contractNumber: string;
  constructor(
    private stateService: StateService
  ) { }
  ngOnInit() {
    this.stateService.main.subscribe((m: Transmogrifier) => {
      this.trans = m;
      if (this.type === "program-contact") {
        this.contractNumber = m.contracts.find(c => c.contractId === this.programInfo.contractId).contractNumber;
      }
    });
  }
}

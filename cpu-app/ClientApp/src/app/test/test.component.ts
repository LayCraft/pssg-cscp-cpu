import { Component, OnInit } from '@angular/core';
import { BudgetProposalService } from '../core/services/budget-proposal.service';
import { TransmogrifierBudgetProposal } from '../core/models/transmogrifier-budget-proposal.class';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  // data: any;
  // trans: TransmogrifierBudgetProposal
  constructor(
    // private budgetProposalService: BudgetProposalService
  ) { }
  ngOnInit() {
    // this.budgetProposalService.getBudgetProposal('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4', '47e47399-3633-ea11-b814-00505683fbf4').subscribe(p => {
    //   this.data = p;
    //   this.trans = new TransmogrifierBudgetProposal(p);
    // })
  }
}

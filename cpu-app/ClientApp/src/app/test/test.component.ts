import { Component, OnInit } from '@angular/core';
import { BudgetProposalService } from '../core/services/budget-proposal.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  data: any;
  constructor(
    private budgetProposalService: BudgetProposalService
  ) { }
  ngOnInit() {
    this.budgetProposalService.getBudgetProposal('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4', '0e309304-c4e6-e911-b811-00505683fbf4').subscribe(d => this.data = d);
  }
}

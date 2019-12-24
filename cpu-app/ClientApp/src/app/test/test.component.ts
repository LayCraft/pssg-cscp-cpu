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
    this.budgetProposalService.getBudgetProposal('orgid', 'userid').subscribe(d => this.data = d);
  }
}

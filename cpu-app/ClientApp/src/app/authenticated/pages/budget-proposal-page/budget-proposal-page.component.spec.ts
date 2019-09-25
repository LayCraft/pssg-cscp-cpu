import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetProposalPageComponent } from './budget-proposal-page.component';

describe('BudgetProposalPageComponent', () => {
	let component: BudgetProposalPageComponent;
	let fixture: ComponentFixture<BudgetProposalPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BudgetProposalPageComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BudgetProposalPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

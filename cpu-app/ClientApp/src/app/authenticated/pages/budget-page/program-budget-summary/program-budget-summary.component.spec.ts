import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramBudgetSummaryComponent } from './program-budget-summary.component';

describe('ProgramBudgetSummaryComponent', () => {
  let component: ProgramBudgetSummaryComponent;
  let fixture: ComponentFixture<ProgramBudgetSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramBudgetSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramBudgetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

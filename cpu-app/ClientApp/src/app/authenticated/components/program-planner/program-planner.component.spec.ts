import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPlannerComponent } from './program-planner.component';

describe('ProgramPlannerComponent', () => {
  let component: ProgramPlannerComponent;
  let fixture: ComponentFixture<ProgramPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

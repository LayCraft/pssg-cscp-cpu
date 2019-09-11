import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyUpdatePageComponent } from './monthly-update-page.component';

describe('MonthlyUpdatePageComponent', () => {
  let component: MonthlyUpdatePageComponent;
  let fixture: ComponentFixture<MonthlyUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

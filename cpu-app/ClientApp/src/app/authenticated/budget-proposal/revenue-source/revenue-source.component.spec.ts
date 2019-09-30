import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueSourceComponent } from './revenue-source.component';

describe('RevenueSourceComponent', () => {
  let component: RevenueSourceComponent;
  let fixture: ComponentFixture<RevenueSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

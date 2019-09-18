import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusReportPageComponent } from './status-report-page.component';

describe('StatusReportPageComponent', () => {
  let component: StatusReportPageComponent;
  let fixture: ComponentFixture<StatusReportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusReportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

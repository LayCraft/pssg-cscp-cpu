import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeInformation2Component } from './administrative-information2.component';

describe('AdministrativeInformation2Component', () => {
  let component: AdministrativeInformation2Component;
  let fixture: ComponentFixture<AdministrativeInformation2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeInformation2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeInformation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

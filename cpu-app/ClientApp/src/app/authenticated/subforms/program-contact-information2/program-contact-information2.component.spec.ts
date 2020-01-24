import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramContactInformation2Component } from './program-contact-information2.component';

describe('ProgramContactInformation2Component', () => {
  let component: ProgramContactInformation2Component;
  let fixture: ComponentFixture<ProgramContactInformation2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramContactInformation2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramContactInformation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

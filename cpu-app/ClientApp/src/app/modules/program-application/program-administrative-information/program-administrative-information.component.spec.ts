import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAdministrativeInformationComponent } from './program-administrative-information.component';

describe('ProgramAdministrativeInformationComponent', () => {
  let component: ProgramAdministrativeInformationComponent;
  let fixture: ComponentFixture<ProgramAdministrativeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramAdministrativeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramAdministrativeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

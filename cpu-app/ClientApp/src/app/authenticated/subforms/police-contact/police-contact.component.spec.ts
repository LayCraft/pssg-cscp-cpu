import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceContactComponent } from './police-contact.component';

describe('Address2Component', () => {
  let component: PoliceContactComponent;
  let fixture: ComponentFixture<PoliceContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

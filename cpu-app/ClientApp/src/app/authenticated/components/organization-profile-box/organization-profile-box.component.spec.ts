import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationProfileBoxComponent } from './organization-profile-box.component';

describe('OrganizationProfileBoxComponent', () => {
  let component: OrganizationProfileBoxComponent;
  let fixture: ComponentFixture<OrganizationProfileBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationProfileBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProfileBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

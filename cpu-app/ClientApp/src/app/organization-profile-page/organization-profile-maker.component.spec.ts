import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationProfileMakerComponent } from './organization-profile-page.component';

describe('OrganizationProfileMakerComponent', () => {
  let component: OrganizationProfileMakerComponent;
  let fixture: ComponentFixture<OrganizationProfileMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationProfileMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProfileMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

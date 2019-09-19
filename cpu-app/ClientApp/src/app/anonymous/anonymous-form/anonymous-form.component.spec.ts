import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousFormComponent } from './anonymous-form.component';

describe('AnonymousFormComponent', () => {
  let component: AnonymousFormComponent;
  let fixture: ComponentFixture<AnonymousFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

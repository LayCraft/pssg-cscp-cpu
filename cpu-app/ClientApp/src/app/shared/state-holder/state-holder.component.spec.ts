import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateHolderComponent } from './state-holder.component';

describe('StateHolderComponent', () => {
  let component: StateHolderComponent;
  let fixture: ComponentFixture<StateHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

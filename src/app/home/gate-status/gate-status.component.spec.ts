import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateStatusComponent } from './gate-status.component';

describe('GateStatusComponent', () => {
  let component: GateStatusComponent;
  let fixture: ComponentFixture<GateStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateStatusComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

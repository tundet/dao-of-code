/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Dev1Component } from './dev1.component';

describe('Dev1Component', () => {
  let component: Dev1Component;
  let fixture: ComponentFixture<Dev1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dev1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dev1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

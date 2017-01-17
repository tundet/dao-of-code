/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Dev3Component } from './dev3.component';

describe('Dev3Component', () => {
  let component: Dev3Component;
  let fixture: ComponentFixture<Dev3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dev3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dev3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

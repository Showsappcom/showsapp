/**
 * Angular Imports
 */
import { Component, DebugElement } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { async, inject, TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Component under test
 */
import { LoadingComponent } from './loading.component';

/**
 * Required Mock Models
 */
import { RetryEventModel } from '../../../models/retry/retry.model';


describe('Component: LoadingComponent', () => {
  let component : LoadingComponent;
  let fixture : ComponentFixture<LoadingComponent>;
  let mainEl : DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoadingComponent
      ]
    });

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;

  });

  it('should check whether the component is defined', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeDefined();
    });
  });


});

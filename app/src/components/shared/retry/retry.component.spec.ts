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
import { RetryComponent } from './retry.component';

/**
 * Required Mock Models
 */
import { RetryEventModel } from '../../../models/retry/retry.model';


describe('Component: RetryComponent', () => {
  let component : RetryComponent;
  let fixture : ComponentFixture<RetryComponent>;
  let mainEl : DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RetryComponent
      ]
    });

    fixture = TestBed.createComponent(RetryComponent);
    component = fixture.componentInstance;

  });

  it('should check whether the component is defined', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeDefined();
    });
  });

  it('should check the text passed is correct', () => {

    component.message = 'hello how are you doing';
    fixture.detectChanges();

    let testEl = fixture.debugElement.query(By.css('button'));
    expect(testEl.nativeElement.innerHTML).toBe(component.message);

  });

  it('should validate an output event is triggered', () => {
    let actionEvent : RetryEventModel;

    fixture.detectChanges();
    component.refreshEmitted.subscribe(( action : RetryEventModel ) => {
      actionEvent = action;
    });

    let testEl = fixture.debugElement.query(By.css('button'));
    testEl.triggerEventHandler('click', null);


    expect(actionEvent.action).toMatch('refresh');
  });

});

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { mockStore } from '../../../configurations/mocks/mockStore';
import { Router } from '@angular/router';


describe('Component: LoginComponent', () => {

  let fixture, component;


  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        {
          useClass: class {
            public loginUser() : void {
            }
          }
        },
        {
          provide: Router,
          useClass: class {navigate = jasmine.createSpy('navigate');}
        },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();



    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

  }));


  it('should have component defined', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeDefined();
    });
  });


});

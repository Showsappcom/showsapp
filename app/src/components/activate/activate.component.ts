/**
 * Required Angular Imports
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


/**
 * Required Events/Services
 */
import { ActivateService } from '../../services/activate.service';
import { MessageEvent } from '../../services/messageEvent.service';


/**
 * Required Libraries
 */
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


/**
 * Required Constants
 */


/**
 * Models/Interfaces
 */
import { MessageModel } from '../../models/messageModels/messageEvent.model';
import { PasswordModel } from '../../models/login/login.model';
// import { COMMON_CONSTANTS as COMMON_CONST } from '../../../configurations/constants/common.constant';

/**
 * Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';


/**
 * @class ActivateComponent
 * @property templateUrl - provides dom markup
 * @property styleUrls - provides override styles for the container
 * @property selector - provides the selector to use in dom tree
 */
@Component({
  templateUrl: './activate.component.html',
  styleUrls: [ './activate.component.scss' ]
})


export class ActivateComponent {

  /**
   * @type {string} _activationCode - Provides reference to activation code
   */
  private _activationCode : string;


  /**
   * @type {string} _activationType - Provides reference to activation type
   */
  public activationType : string;

  /**
   * @type {boolean} activationSuccessful - Whether activation was successful
   */
  public activationSuccessful : boolean = false;


  /**
   * @type {boolean} activationPending - Whether activation is pending
   */
  public activationPending : boolean = false;


  /**
   * @type {boolean} retryActivation - Whether user needs to try to reactivate
   */
  public retryActivation : boolean = false;
  /**
   * @type {boolean} _compActive - provides a variable if the comp is active
   */
  private _compActive : boolean = true;

  /**
   * @type {Subscription} _messageEventSub - provides a subscription to message events
   */
  private _messageEventSub : Subscription;


  /**
   * @type {string} toolBarTitle - provides a reference to the toolbar title
   */
  public toolBarTitle : string = 'Activation';

  /**
   * @type {boolean} formGenerated - provides reference if form group generated
   */
  public formGenerated : boolean = false;


  /**
   * Provide a reference for the reactive form group
   */
  public passwordFormControl : FormGroup;

  /**
   * Provides element reference to the side navigation
   * @param {ActivateService} _activationService - activations service provider
   * @param {FormBuilder} _fb - angular form builder
   * @param {MessageEvent} _msgEvent - message event provider
   * @param {ActivatedRoute} _route - activate route provider
   * @param {Router} _router - router provider
   * @param {Store<fromRoot.State>} _store - store provider
   */
  constructor( private _activationService : ActivateService,
               private _fb : FormBuilder,
               private _msgEvent : MessageEvent,
               private _route : ActivatedRoute,
               private _router : Router,
               private _store : Store<fromRoot.State> ) {


  }

  /**
   * Angular life cycle method
   */
  ngOnInit() {

    this._generateForm();
    this._getRouteParam();

  }


  /**
   * Angular life cycle method
   */
  ngOnDestroy() {


    this._clearSubs();


  }


  private _generateForm() : void {

    this.passwordFormControl = this._fb.group({
      email: [
        '',
        [
          Validators.email,
          Validators.required
        ]
      ],
      password: [
        '',
        [ Validators.required ]
      ],
      confirmPassword: [
        '',
        [ Validators.required ]
      ]

    });

    this.formGenerated = true;
    this._formChangeHandler();
  }

  private _formChangeHandler() : void {
    this.passwordFormControl.valueChanges.takeWhile(() => {
      return this._compActive;
    }).subscribe(val => {
      console.log('this val changed....', val);

      this._testEquality('password', 'confirmPassword');
    });
  }

  private _testEquality( field : string, fieldToCompare : string ) {

    if (this.passwordFormControl.get(field).value !== this.passwordFormControl.get(fieldToCompare).value) {
      this.passwordFormControl.setErrors({
        'passwordNotMatching': true
      });
    } else {
      this.passwordFormControl.setErrors(null);
    }

    console.log('i clear error here', this.passwordFormControl);

  }

  /**
   * clears the subs
   * @returns void
   */
  private _clearSubs() : void {
    this._compActive = false;
  }


  private _getRouteParam() : void {

    this._route.data.takeWhile(() => {
      return this._compActive;
    }).subscribe(( data ) => {


      if (data && data[ 'password' ]) {

        this.activationType = 'password';

      } else if (data && data[ 'email' ]) {

        this.activationType = 'email';

      } else {

        this.activationType = 'account';

      }

    });

    this._route.params.takeWhile(() => {
      return this._compActive;
    }).subscribe(( params ) => {
      console.log('will send activation request', params);

      if (params && params[ 'activateCode' ].length > 0) {

        this._activationCode = params[ 'activateCode' ];

        if (this.activationType === 'account') {
          this._sendActivation(this._activationCode);

        } else if (this.activationType === 'email') {

          this._sendEmailValidation(this._activationCode);
        }

      } else {
        this._router.navigate([ '/login' ]);
      }

    });
  }


  public retryAccountActivation() : void {

    if (this.activationType === 'account') {

      this._sendActivation(this._activationCode);

    } else if (this.activationType === 'email') {

      this._sendEmailValidation(this._activationCode);


    } else if (this.activationType === 'password') {

      this._sendPasswordUpdate(this._activationCode);

    }

  }

  private _sendPasswordUpdate( activationCode : string ) : void {
    this.retryActivation = false;
    this.activationPending = true;

    let passwordUpdateObject : PasswordModel = {
      email: this.passwordFormControl.get('email').value,
      token: activationCode,
      password: this.passwordFormControl.get('password').value

    };

    this._activationService.setNewPassword(passwordUpdateObject).takeWhile(() => {
      return this._compActive;
    }).subscribe(( res : any ) => {
      this.activationPending = false;
      this.activationSuccessful = true;

    }, () => {

      this.activationSuccessful = false;
      this.retryActivation = true;
      this.activationPending = false;

    });
  }

  private _sendActivation( activationCode : string ) : void {
    this.retryActivation = false;
    this._activationService.activateAccount(activationCode).takeWhile(() => {
      return this._compActive;
    }).subscribe(( res : any ) => {

      this.activationSuccessful = true;

    }, () => {

      this.activationSuccessful = false;
      this.retryActivation = true;
    });
  }


  private _sendEmailValidation( activationCode : string ) : void {
    this.retryActivation = false;
    this._activationService.validateEmail(activationCode).takeWhile(() => {
      return this._compActive;
    }).subscribe(( res : any ) => {

      this.activationSuccessful = true;

    }, () => {

      this.activationSuccessful = false;
      this.retryActivation = true;
    });
  }

  public goToLogin() : void {

    this._router.navigate([ '/login' ]);

  }


}

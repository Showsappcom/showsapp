/**
 * Required Modules
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Required Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as BaseActions from '../../../actions/base';
import { State as BaseState } from '../../../reducers/base';


/**
 * Required Services
 */
import { MessageEvent } from '../../../services/messageEvent.service';
import { ModalsEvent } from '../../../services/modalsEvent.service';
import { ToastEvent } from '../../../services/toastEvent.service';
import { LoginService } from '../../../services/login.service';
import { COMMON_CONSTANTS as COMMON_CONST } from '../../../configurations/constants/common.constant';

/**
 * constants
 */
/**
 * @class LoginComponent
 * @property templateUrl - provides dom markup
 * @property styleUrls - provides override styles for the container
 */
@Component(
  {
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
  })

export class LoginComponent {


  private _baseState : BaseState;
  /**
   * Provide a reference of if the comp is active
   */
  private _compActive : boolean = true;

  /**
   * Provide a reference of if the login view is the login or the request container
   */
  public loginView : boolean = true;

  /**
   * Provide a reference of if the login view is forgot password
   */
  public forgotPasswordView : boolean = false;

  /**
   * Provide a reference for the reactive form group
   */
  public forgotEmailFormGroup : FormGroup;


  /**
   * Provide a reference for the reactive form group
   */
  public loginFormControl : FormGroup;

  /**
   * Provide a reference for the reactive form group
   */
  public requestFormControl : FormGroup;


  /**
   * Provide a reference for the signingIn
   */
  public signingIn : boolean = false;


  /**
   * @param {FormBuilder} _formBuilder - provides the form builder provider
   * @param {LoginService} _loginService - provides the modal event namespace
   * @param {MessageEvent} _msgEvent - provides the message event namespace
   * @param {ModalsEvent} _modalsEvent - provides the modal event namespace
   * @param {Store<fromRoot.State>} _store - prodvides the application store
   * @param {ToastEvent} _toastEvent - provides toast event
   */
  constructor( private _formBuilder : FormBuilder,
               private _loginService : LoginService,
               private _msgEvent : MessageEvent,
               private _modalsEvent : ModalsEvent,
               private _store : Store<fromRoot.State>,
               private _toastEvent : ToastEvent ) {


  }

  /**
   * Initialization hook
   */
  ngOnInit() {

    LoginComponent._updateBodyStyle();
    this._setupFormGroup();
    this._setupUserSub();


  }

  ngOnDestroy() {
    this._clearSubs();
  }


  /**
   * Setup user sub
   * @returns void
   */
  private _setupUserSub() : void {

    this._store.let(fromRoot.getBaseState).takeWhile(() => {
      return this._compActive;

    }).subscribe(( state : BaseState ) => {
      this._baseState = state;

      if (this._baseState.loggedIn) {

        this._msgEvent.fire({
          msg: 'loggedIn'
        });
      }
    });

  }

  /**
   * Clear subscriptions on destroy
   * @returns void
   */
  private _clearSubs() : void {
    this._compActive = false;
  }


  /**
   * Setup reactive form group
   * @returns void
   */
  private _setupFormGroup() : void {
    this.loginFormControl = this._formBuilder.group({
      username: [
        '',
        [ Validators.required ]
      ],
      password: [
        '',
        [ Validators.required ]
      ]
    });

    this.requestFormControl = this._formBuilder.group({
      firstName: [
        ''
      ],
      lastName: [
        ''
      ],
      email: [
        '',
        [ Validators.email ]
      ],
      requestPassword: [
        '',
        [ Validators.required ]
      ],
      requestPasswordVerify: [
        '',
        [ Validators.required ]
      ]
    });

    this.forgotEmailFormGroup = this._formBuilder.group({
      forgotEmail: [
        '',
        [ Validators.email ]
      ]
    });

  }

  /**
   * Updates the body style accordingly
   * @returns void
   */
  private static _updateBodyStyle() : void {

    document.getElementsByTagName('body')[ 0 ].style.overflowX = 'hidden';

  }


  /**
   * Method to submit the login
   * @returns void
   */
  public submitForm() : void {


    this.signingIn = true;
    this._loginService.login({
      username: this.loginFormControl.get('username').value,
      password: this.loginFormControl.get('password').value
    }).takeWhile(() => {
      return this._compActive;
    }).subscribe(( res : any ) => {
      this._store.dispatch(new BaseActions.Update({
        ...this._baseState, loggedIn: true, authToken: res.token
      }));
    }, () => {
      this.signingIn = false;
    });
    // this._store.dispatch()
  }


  /**
   * Method to register user to the application
   * @returns void
   */
  public register() : void {
    this._loginService.register({
      first_name: this.requestFormControl.get('firstName').value,
      last_name: this.requestFormControl.get('lastName').value,
      email: this.requestFormControl.get('email').value,
      password: this.requestFormControl.get('requestPassword').value
    }).takeWhile(() => {

      return this._compActive;

    }).subscribe(( res : any ) => {

      this._toastEvent.fire({
        type: COMMON_CONST.INFO,
        message: 'Please Check Your E-mail, to verify the account'
      });
      this.loginView = true;
    });
  }


  /**
   * Method to retrieve password
   * @returns void
   */
  public retrievePassword() : void {
    this._loginService.retrievePassword(this.forgotEmailFormGroup.get('forgotEmail').value).takeWhile(() => {
      return this._compActive;
    }).subscribe(( res : any ) => {
      this._toastEvent.fire({
        type: COMMON_CONST.INFO,
        message: 'Please Check Your E-mail, for instruction to reset your password'
      });

      this.loginView = true;
    });

  }

}

/**
 * Required Angular Imports
 */
import { Injectable } from '@angular/core';

/**
 * Constants/Configuration
 */
import { COMMON_CONSTANTS as COMMON_CONST } from '../configurations/constants/common.constant';
import { APP_SETUP } from '../configurations/app.configuration';

/**
 * Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Observable } from 'rxjs/Observable';


/**
 * Required Actions
 */
import * as base from '../actions/base';


/**
 * Required Services
 */
import { DataService } from './data.service';
import { ToastEvent } from './toastEvent.service';

/**
 * Required Models/Interfaces
 */
import { UserCredentialsModel, RegisterModel } from '../models/login/login.model';

/**
 * A service that provides translations
 * @class TranslationService
 */
@Injectable()
export class LoginService {


  private _BASE_URL : string = APP_SETUP.devEnvironment ? 'http://localhost:8888/' : location.origin + '/';
  private _loginURL : string = this._BASE_URL + 'api/v1/accounts/login/';
  private _registerURL : string = this._BASE_URL + 'api/v1/accounts/signup/';
  private _retrievePasswordURL : string = this._BASE_URL + 'api/v1/accounts/password_reset/';

  constructor( private _dataService : DataService, private _store : Store<fromRoot.State>, private _toastEvent : ToastEvent ) {

  }


  public register( registerValues : RegisterModel ) : Observable<any> {


    let requestOptions = {
      method: 'POST',
      body: registerValues,
      withCredentials: true
    }, url = this._registerURL;

    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {
      return res;

    }).catch(( error : any ) => {
      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an issue with your registration please try again'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });
  }

  public login( credential : UserCredentialsModel ) : Observable<any> {

    let requestOptions = {
      method: 'POST',
      body: credential,
      withCredentials: true
    }, url = this._loginURL;

    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {
      return res;

    }).catch(( error : any ) => {
      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'Please verify user name and password'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });

  }

  public retrievePassword( emailString : string ) : any {
    let requestOptions = {
      method: 'POST',
      body: { email: emailString },
      withCredentials: true
    }, url = this._retrievePasswordURL;

    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {

      return res;

    }).catch(( error : any ) => {
      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an error with your request please try again'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });
  }

}

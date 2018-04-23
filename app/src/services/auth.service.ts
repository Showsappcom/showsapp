/**
 * Required Angular Imports
 */
import { Injectable } from '@angular/core';


/**
 * Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

/**
 * Required Actions
 */
import * as BaseActions from '../actions/base';


/**
 * Constants Configuration
 */
import { APP_SETUP } from "../configurations/app.configuration";
import { COMMON_CONSTANTS as COMMON_CONST } from "../configurations/constants/common.constant";

/**
 * Required Services
 */
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { ToastEvent } from './toastEvent.service';

/**
 * A service that provides a data abstraction to activate a user.
 * @class ActivateService
 */
@Injectable()
export class AuthService {


  /**
   * @type {string} _BASE_URL - Provides based url
   */
  private _BASE_URL : string = APP_SETUP.devEnvironment ? 'http://staging.aws.showsapp.com:8888/' : location.origin;
  /**
   * @type {string} _activateURL - Provides activation url url
   */
  private _checkToken : string = this._BASE_URL + 'api/v1/accounts/token-verify/';


  /**
   * @param {CookieService} _cookieService - Provides cookie service
   * @param {DataService} _dataService - Provides data service
   * @param {Store<fromRoot.State>} _store - Provides store provider
   * @param {ToastEvent} _toastEvent - Provides toast event
   */
  constructor( private _cookieService : CookieService,
               private _dataService : DataService,
               private _store : Store<fromRoot.State>,
               private _toastEvent : ToastEvent ) {

  }

  /**
   * Method to check token for a user
   * @return any
   */
  public checkToken() : any {

    let access_token : string = this._cookieService.get('sa_access_token');
    console.log('the access token is', access_token);


    if (access_token) {

      let requestOptions = {
        method: 'POST',
        body: {
          token: access_token
        },
        withCredentials: true
      }, url = this._checkToken;


      return this._dataService.sendData(url, requestOptions, true).map(( res : any ) => {

        return res;

      }).catch(( error : any ) => {

        this._toastEvent.fire({
          type: COMMON_CONST.ERROR,
          message: 'There was an error with your request please try again'
        });

        return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

      });
    } else {

      return Observable.throw('no token found');

    }


  }

  /**
   * Method to update cookie store
   * @return void
   */
  public updateToken( token : string ) : void {
    this._cookieService.set('sa_access_token', token);

    console.log('the token is simply', this._cookieService.get('sa_access_token'));


  }

  public logOut() : any {

    return  Observable.create(observer => {
      // console.log('i am deleting the token');
      this._cookieService.delete('sa_access_token');
      // console.log('lets have a check here ...', this._cookieService.check('sa_access_token'), this._cookieService.get('sa_access_token'));

      observer.next('done');
      observer.complete();

    });


  }
}



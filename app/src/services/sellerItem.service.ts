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
import * as base from '../actions/base';


/**
 * Required Models
 */
import { SellerItemObject } from '../models/items/item.model';


/**
 * Required Services
 */
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { ToastEvent } from '../services/toastEvent.service';


/**
 * Configuration
 */
import { APP_SETUP } from '../configurations/app.configuration';
import { COMMON_CONSTANTS as COMMON_CONST } from '../configurations/constants/common.constant';

/**
 * A service that provides the data service for seller item
 * @class SellerItemService
 */
@Injectable()
export class SellerItemService {


  /**
   * @type {string} _BASE_URL - Provides based url
   */
  private _BASE_URL : string = APP_SETUP.devEnvironment ? 'http://staging.aws.showsapp.com:8888/' : location.origin + '/';
  /**
   * @type {string} _activateURL - Provides activation url url
   */
  private _saveItem : string = this._BASE_URL + 'api/v1/markets/create_item/';

  constructor( private _dataService : DataService, private _store : Store<fromRoot.State>, private _toastEvent : ToastEvent ) {

  }

  public saveItem( item : SellerItemObject ) : any {


    let requestOptions = {
      method: 'POST',
      body: item,
      withCredentials: true
    }, url = this._saveItem;


    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {

      console.log('the response is:::::::::', res);

      return res;

    }).catch(( error : any ) => {

      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an error getting your items please try agin'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });


  }

  // public editItem() : any {
  //
  //
  // }

}

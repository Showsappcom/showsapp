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
import { OfferItemObject } from '../models/items/item.model';


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
export class NegotiationService {


  /**
   * @type {string} _BASE_URL - Provides based url
   */
  private _BASE_URL : string = APP_SETUP.devEnvironment ? 'http://localhost:8888/' : location.origin + '/';

  /**
   * @type {string} _counterOffer - Provides counter  url
   */
  private _counterOffer : string = this._BASE_URL + 'api/v1/markets/accept_offer/';

  /**
   * @type {string} _acceptOffer - Provides accept url
   */
  private _acceptOffer : string = this._BASE_URL + 'api/v1/markets/accept_offer/';

  /**
   * @type {string} _addToWaitList - Provides add to wait list  url
   */
  private _addToWaitList : string = this._BASE_URL + 'api/v1/markets/accept_offer/';

  constructor( private _dataService : DataService, private _store : Store<fromRoot.State>, private _toastEvent : ToastEvent ) {

  }

  public acceptOffer( offer : OfferItemObject ) : any {


    let requestOptions = {
      method: 'POST',
      body: offer,
      withCredentials: true
    }, url = this._acceptOffer;


    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {

      return res;

    }).catch(( error : any ) => {

      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an error accepting the offer please try again'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });


  }

  public declineOffer( offer : OfferItemObject ) : any {


    let requestOptions = {
      method: 'POST',
      body: offer,
      withCredentials: true
    }, url = this._acceptOffer;


    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {

      return res;

    }).catch(( error : any ) => {

      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an error declining the offer please try again'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });
  }

}

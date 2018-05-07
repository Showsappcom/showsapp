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
 * Configurations
 */
import { APP_SETUP } from '../configurations/app.configuration';
import { COMMON_CONSTANTS as COMMON_CONST } from '../configurations/constants/common.constant';

/**
 * Required Services
 */
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { ToastEvent } from '../services/toastEvent.service';

/**
 * A service that provides translations
 * @class TranslationService
 */
@Injectable()
export class SellerService {


  /**
   * @type {string} _BASE_URL - Provides based url
   */
  private _BASE_URL : string = APP_SETUP.devEnvironment ? 'http://staging.aws.showsapp.com:8888/' : location.origin + '/';
  /**
   * @type {string} _activateURL - Provides activation url url
   */
  private _archiveItem : string = this._BASE_URL + 'api/v1/markets/myitems/';
  private _getItems : string = this._BASE_URL + 'api/v1/markets/myitems/';


  constructor( private _dataService : DataService,
               private _store : Store<fromRoot.State>,
               private _toastEvent : ToastEvent ) {

  }

  public getSellerData() : any {


    let requestOptions = {
      method: 'GET',
      body: {},
      withCredentials: true
    }, url = this._getItems;


    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {

      console.log('the response is:::::::::', res);

      return res;

    }).catch(( error : any ) => {

      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an error getting your items please try again'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });

  }

  public getSellerItem( id : string ) : any {

    let requestOptions = {
      method: 'GET',
      body: {},
      withCredentials: true
    }, url = this._getItems + id;

    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {

      console.log('the response is:::::::::', res);

      return res;

    }).catch(( error : any ) => {

      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an error getting your items please try again'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });
  }

  public archiveItem( id : string ) {


    let requestOptions = {
      method: 'DELETE',
      withCredentials: true
    }, url = this._archiveItem + id;


    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {

      console.log('the response is:::::::::', res);

      return res;

    }).catch(( error : any ) => {

      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an error deleting your items please try again'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });
  }


  public determineOfferAccepted( offerArray : Array<object>, key : string ) : boolean {

    for (let i = 0, iLen = offerArray.length; i < iLen; i++) {
      if (offerArray[ i ][ key ]) {
        return true;
      }
    }

    return false;
  }

  public updateSellerItem( id : number, accepted : boolean, offerArray : Array<object> ) : Array<object> {

    return offerArray.map(( node ) => {
      if (node[ 'id' ] !== id) {
        node[ 'accepted' ] = false;

      } else if (node[ 'id' ] === id) {

        node[ 'accepted' ] = accepted;

      }

      return node;
    })

  }


  public updateOfferListSort( option : string, offerArray : Array<object> ) : Array<object> {
    return offerArray.sort(( a, b ) => {
      return a[ 'value' ] - b[ 'value' ];
    });
  }

  public sortByPrice( offerArray : Array<object> ) : Array<object> {

    let offerTemp = offerArray.sort(( a, b ) => {
      return Number(b[ 'value' ]) - Number(a[ 'value' ]);
    });
    console.log('the offer array is:::', offerTemp);
    return offerTemp;
  }
}

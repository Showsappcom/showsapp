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
 * Configuration
 */
import { APP_SETUP } from '../configurations/app.configuration';
import { COMMON_CONSTANTS as COMMON_CONST } from '../configurations/constants/common.constant';

/**
 * Required Services
 */
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { ToastEvent } from './toastEvent.service';

/**
 * A service that provides translations
 * @class TranslationService
 */
@Injectable()
export class BuyerService {

  /**
   * @type {string} _BASE_URL - Provides based url
   */
  private _BASE_URL : string = APP_SETUP.devEnvironment ? 'http://staging.aws.showsapp.com:8888/' : location.origin + '/';
  /**
   * @type {string} _getItemURL - Provides activation url url
   */
  private _getItemURL : string = this._BASE_URL + 'api/v1/markets/item/';
  private _postOfferURL : string = this._BASE_URL + 'api/v1/markets/place_offer/';

  constructor( private _store : Store<fromRoot.State>, private _dataService : DataService, private _toastEvent : ToastEvent ) {

  }


  public getProbability( price : string, offer : string ) : string {
    let x = (Number(offer) / Number(price));

    if (x <= 1 && x > 0) {

      // let primaryTerm = Math.pow(10, -9)*-1;
      // let secondTerm = Math.pow(10,-6);
      // let xFourth = Math.pow(x, 4);
      // let xThird = Math.pow(x, 3);
      // let xSquared = Math.pow(x, 2);

      x = x * 100;

      if (x >= 100) {

        return '100';

      } else {


        if (x >= 60 && x <= 87) {

          let optionCubedDouble = Number((0.0013 * Math.pow(x, 3)) - (0.3668 * Math.pow(x, 2)) + 34.548 * x - 1003.4);

          optionCubedDouble = Math.trunc(optionCubedDouble);

          if (optionCubedDouble >= 100) {

            return '100';
          } else {
            return '' + Math.trunc(optionCubedDouble);

          }


        } else if (x >= 88 && x < 99) {

          return '' + Math.trunc(x);

        } else {

          let optionCubed = Math.trunc((0.0003 * Math.pow(x, 3)) - (0.0238 * Math.pow(x, 2)) + 0.6125 * x - 1.5308);
          // let optionY = (-1*primaryTerm*xFourth)+(3*secondTerm*xThird)+(-0.0002*xSquared)+(0.0052*x);
          // let y = (-1 * Math.pow(10, -9) * Math.pow(x, 4)) + (3 * Math.pow(10, -6) * Math.pow(x, 3)) - (0.0002 * Math.pow(x, 2)) + (0.0052 * x);
          // console.log('y i simply:::', y, optionY,optionCubed);
          // console.log('x i simply:::', x);
          // console.log('x4 i simply:::', xFourth);
          // console.log('x3 i simply:::', xThird);
          // console.log('x2 i simply:::', xSquared);


          console.log('option Cubed', optionCubed);
          if (optionCubed >= 100) {

            return '100';

          } else {

            return '' + optionCubed;

          }
        }


      }


    } else if (x >= 1) {

      return '100';

    } else {

      return '0';

    }

  }

  public getSellerData( sellerId : string, slugId : string ) : any {

    console.log('i will use this service soon', sellerId, slugId);


    let requestOptions = {
      method: 'GET',
      body: {},
      withCredentials: true
    }, url = this._getItemURL + sellerId + '/' + slugId + '/';


    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {

      console.log('the response is:::::::::', res);

      return res;

    }).catch(( error : any ) => {


      this._toastEvent.fire({
        type: COMMON_CONST.ERROR,
        message: 'There was an error getting the item please try again'
      });

      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });

  }

  public sendOffer( object? : any ) : any {

    let requestOptions = {
      method: 'POST',
      body: object,
      withCredentials: true
    }, url = this._postOfferURL;


    return this._dataService.sendData(url, requestOptions).map(( res : any ) => {


      return res;

    }).catch(( error : any ) => {


      console.log('the error is :::', error);
      if (error.status === 500 && error.error && error.error.detail && error.error.detail === 'Should verify the accout first.') {
        this._toastEvent.fire({
          type: COMMON_CONST.INFO,
          message: 'Your offer is pending e-mail validation'
        });
      } else {
        this._toastEvent.fire({
          type: COMMON_CONST.ERROR,
          message: 'There was an error sending your offer, please try again'
        });
      }


      return Observable.throw(error || COMMON_CONST.SERVER_ERROR);

    });
  }

}

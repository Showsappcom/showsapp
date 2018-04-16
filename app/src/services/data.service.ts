// Observable Version
import { Injectable } from '@angular/core';


import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpRequest
} from '@angular/common/http';


/**
 * Actions/Services
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { State as BaseState } from "../reducers/base";


/**
 * Libraries
 */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class DataService {

  /**
   * @type {BaseState} _baseState - application base state
   */
  private _baseState : BaseState;

  /**
   * @type {boolean} _compActive - if the comp is active
   */
  private _compActive : boolean = true;


  constructor( private _http : HttpClient, private _store : Store<fromRoot.State> ) {


    this._setupBaseSub();

  }


  private _setupBaseSub() : void {

    this._store.let(fromRoot.getBaseState).takeWhile(() => {

      return this._compActive;

    }).subscribe(( state : BaseState ) => {

      console.log('the state is:', state);
      this._baseState = state;

    });

  }

  private _checkError( error : any, endPoint : any ) {

    // if (endPoint && endPoint.split('/')[ endPoint.split('/').length - 1 ] !== 'token' && endPoint && endPoint.split('/')[ endPoint.split('/').length - 1 ] !== 'logout') {
    //
    //
    //

  }


  /* Service Method to Login User */
  public sendData( url : string, options : Object, override : boolean = false, justSend : boolean = false ) : Observable<any> {
    let isResponseHeaderExists = false;


    let req = new HttpRequest(options[ 'method' ], url, options[ 'body' ], {
      headers: options[ 'headers' ],
      withCredentials: options[ 'withCredentials' ],
      params: options[ 'params' ],
      responseType: options[ 'responseType' ],
      reportProgress: options[ 'reportProgress' ] ? options[ 'reportProgress' ] : null
    });


    if (this._baseState && this._baseState.loggedIn) {

      options[ 'headers' ].set('authorization', 'jwt ' + this._baseState.authToken);


    }

    console.log('i am here boom.....', req, options);
    return Observable.create(observer => {
      this._http.request(req).subscribe(
        ( event : HttpEvent<any> ) => {


          switch (event.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.ResponseHeader:
              isResponseHeaderExists = true;
              break;
            case HttpEventType.DownloadProgress:
              const kbLoaded = Math.round(event.loaded / 1024);
              break;
            case HttpEventType.Response:
              if (isResponseHeaderExists) {
                observer.next(event);
                observer.complete();
              } else {
                observer.next(event.body);
                observer.complete();
              }
          }

        },
        err => {
          /* Error management can be done here ..*/
          observer.error(err);
          observer.complete();

        }
      );
    });


  }
}


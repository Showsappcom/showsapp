/**
 * Required Angular Imports
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


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
   * @type {boolean} activationSuccessful - Whether activation was successful
   */
  public activationSuccessful : boolean = false;


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
   * Provides element reference to the side navigation
   * @param {ActivationService} _activationService - activations service provider
   * @param {MessageEvent} _msgEvent - message event provider
   * @param {ActivatedRoute} _route - activate route provider
   * @param {Router} _router - router provider
   * @param {Store<fromRoot.State>} _store - store provider
   */
  constructor( private _activationService : ActivateService,
               private _msgEvent : MessageEvent,
               private _route : ActivatedRoute,
               private _router : Router,
               private _store : Store<fromRoot.State> ) {


  }

  /**
   * Angular life cycle method
   * @returns void
   */
  ngOnInit() : void {

    this._getRouteParam();

  }


  /**
   * Angular life cycle method
   * @returns void
   */
  ngOnDestroy() : void {


    this._clearSubs();
    window.removeEventListener('resize', null);


  }

  /**
   * clears the subs
   * @returns void
   */
  private _clearSubs() : void {
    this._compActive = false;
  }


  private _getRouteParam() : void {

    this._route.params.takeWhile(() => {
      return this._compActive;
    }).subscribe(( params ) => {
      console.log('will send activation request', params);

      if (params && params[ 'activateCode' ].length > 0) {

        this._activationCode = params[ 'activateCode' ];

        this._sendActivation(this._activationCode);

      } else {
        this._router.navigate([ '/login' ]);
      }

    });
  }


  public retryAccountActivation() : void {

    this._sendActivation(this._activationCode);
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


}

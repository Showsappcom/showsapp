/**
 * Required Angular Imports
 */
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


/**
 * Required Events
 */
import { MessageEvent } from '../../services/messageEvent.service';


/**
 * Required Libraries
 */
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


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
 * Services
 */
import { AuthService } from '../../services/auth.service';
import * as BaseActions from "../../actions/base";

/**
 * @class ActivateComponent
 * @property templateUrl - provides dom markup
 * @property styleUrls - provides override styles for the container
 * @property selector - provides the selector to use in dom tree
 */
@Component({
  templateUrl: './base.component.html',
  styleUrls: [ './base.component.scss' ]
})


export class BaseComponent {


  /**
   * @type {boolean} _compActive - determines if a comp is active
   */
  private _compActive : boolean = true;
  /**
   * @type {Subscription} _messageEventSub - provides a subscription to message events
   */
  private _messageEventSub : Subscription;


  /**
   * @type {string} toolBarTitle - provides a reference to the toolbar title
   */
  public toolBarTitle : string = 'Dashboard';


  /**
   * Provides element reference to the side navigation
   * @param {AuthService} _authService - auth service
   * @param {MessageEvent} _msgEvent - message event provider
   * @param {Router} _router - router provider
   * @param {Store<fromRoot.State>} _store - store provider
   */
  constructor( private _authService : AuthService,
               private _msgEvent : MessageEvent,
               private _router : Router,
               private _store : Store<fromRoot.State> ) {


  }

  /**
   * Angular life cycle method
   * @returns void
   */
  ngOnInit() : void {

    BaseComponent._updateBodyStyle();
    this._setupMessageEventListener();

  }


  /**
   * Angular life cycle method
   * @returns void
   */
  ngOnDestroy() : void {


    // if (this._messageEventSub) {
    //   this._messageEventSub.unsubscribe();
    // }

    this._clearSubs();

    window.removeEventListener('resize', null);


  }


  private _clearSubs() : void {
    this._compActive = false;
  }

  /**
   * static method that updates the body style to allow overflow
   * @returns void
   */
  private static _updateBodyStyle() : void {

    document.getElementsByTagName('body')[ 0 ].style.overflowX = 'auto';

  }

  /**
   * Setup a message event subscription
   * @returns void
   */
  private _setupMessageEventListener() : void {

    this._msgEvent.on().takeWhile(() => {
      return this._compActive;
    }).subscribe(( msg : MessageModel ) => {

      this.toolBarTitle = msg.data.title;

    });
  }

  /**
   * Setup a message event subscription
   * @returns void
   */
  public logout() : void {

    this._authService.logOut().takeWhile(() => {
      return this._compActive;
    }).subscribe((resp) => {

      console.log('i will be done here ...', resp);

      if(resp !== 'error'){
        this._store.dispatch(new BaseActions.Update({
          authToken: '',
          loggedIn: false,
          loggedInUser: '',
          theme: 'shows-app-theme',
          language: 'english'
        }));

        this._router.navigate([ '/login' ]);
      }




    });

  }

}

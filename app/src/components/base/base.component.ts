/**
 * Required Angular Imports
 */
import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';


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
 * @class BaseComponent
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
   * @type {Subscription} _messageEventSub - provides a subscription to message events
   */
  private _messageEventSub : Subscription;


  /**
   * @type {string} toolBarTitle - provides a reference to the toolbar title
   */
  public toolBarTitle : string = 'Dashboard';



  /**
   * Provides element reference to the side navigation
   * @param {MessageEvent} _msgEvent - message event provider
   * @param {Router} _router - router provider
   * @param {Store<fromRoot.State>} _store - store provider
   */
  constructor( private _msgEvent : MessageEvent,
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



    if (this._messageEventSub) {
      this._messageEventSub.unsubscribe();
    }


    window.removeEventListener('resize', null);


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

    this._messageEventSub = this._msgEvent.on().subscribe(( msg : MessageModel ) => {

      this.toolBarTitle = msg.data.title;

    });
  }













}

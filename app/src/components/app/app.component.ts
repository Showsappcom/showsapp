/**
 * Required Angular Imports
 */
import {
  Component,
  HostBinding,
  OnInit
} from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';


/**
 * Required Angular Materials
 */
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';


/**
 * Required Events
 */
import { MessageEvent } from '../../services/messageEvent.service';
import { ToastEvent } from '../../services/toastEvent.service';


/**
 * Custom Components
 */
import { ToastComponent } from '../shared/toast/toast.component';

/**
 * Models
 */
import { ToastMsgModel } from '../../models/toast.model';
import { State as BaseState } from '../../reducers/base';


/**
 * Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})


export class AppComponent implements OnInit {


  /**
   * Binds to the host class
   */
  @HostBinding('class') componentCssClass = 'eaton';


  /**
   * @type {boolean} _compActive - stores the current route
   */
  private _compActive : boolean = true;

  /**
   * @type {string} _currentRoute - stores the current route
   */
  private _currentRoute : string = '';


  /**
   * { string } _routeRequested - provides a url that was requested prior to login
   */
  private _routeRequested : string = null;


  /**
   * Constructor
   * @param {MatSnackBar} snackBar - Reference to snackbar
   * @param {MessageEvent} _msgEvent - message event provider
   * @param {OverlayContainer} overlayContainer - Reference to overlay container
   * @param {Router} _router - router provider
   * @param {Store<fromRoot.State>} _store - provider for the application store
   * @param {ToastEvent} _toastEvent - Provides a namespace for toast event pub/sub
   */
  constructor( private _msgEvent : MessageEvent,
               private _router : Router,
               private _store : Store<fromRoot.State>,
               private _toastEvent : ToastEvent,
               public overlayContainer : OverlayContainer,
               public snackBar : MatSnackBar ) {


  }

  /**
   * Angular life cycle method
   * @returns void
   */
  ngOnInit() : void {

    this._setDefaultTheme();
    this._setupUserSub();
    this._setupRouteSub();
    this._setupToastSub();

  }

  /**
   * Setup a default theme for the application
   * @returns void
   */
  private _setupUserSub() : void {
    this._store.let(fromRoot.getBaseState).takeWhile(()=>{
      return this._compActive;

    }).subscribe(( state : BaseState ) => {
      console.log('the state is::::::::::::::::::::::::', state);
      if (state.loggedIn) {
        this._routeToPath('app/main');
      }
    });
  }


  /**
   * Setup a default theme for the application
   * @returns void
   */
  private _setDefaultTheme() : void {
    this.componentCssClass = 'shows-app-theme';
    this.overlayContainer.getContainerElement().classList.add(this.componentCssClass);

  }


  /**
   * Setup a toast sub to update the toast component effectively
   * @returns void
   */
  private _setupToastSub() : void {

    this._toastEvent.on().subscribe(( toastModel : ToastMsgModel ) => {

      console.log('the toastModel is', toastModel);

      if (toastModel.type !== 'close') {
        let snackBarRef : MatSnackBarRef<ToastComponent>, snackConfigModel : MatSnackBarConfig;
        if (toastModel.type === 'success') {


          snackConfigModel = {
            data: toastModel,
            duration: toastModel.duration ? toastModel.duration : null,
            panelClass: [
              'success-snack',
              'mat-elevation-z8'
            ]
          };


        } else if (toastModel.type === 'error') {


          snackConfigModel = {
            data: toastModel,
            duration: toastModel.duration ? toastModel.duration : null,
            panelClass: [
              'error-snack',
              'mat-elevation-z8'
            ]
          };

        } else {
          snackConfigModel = {
            data: toastModel,
            duration: toastModel.duration ? toastModel.duration : null,
            panelClass: [
              'mat-elevation-z8'
            ]
          };
        }


        snackBarRef = this.snackBar.openFromComponent(ToastComponent, snackConfigModel);


        snackBarRef.onAction().subscribe(( action ) => {

          console.log('the action was', action);
          // snackBarRef.dismiss();
          this._closeToast();

        });

      } else {


        this._closeToast();

      }


    });


  }

  /**
   * Close toast component
   * @returns void
   */
  private _closeToast() : void {

    this.snackBar.dismiss();

  }


  /**
   * routes to requested route
   * @returns void
   */
  private _routeToPath( path : string ) : void {
    this._router.navigate([ path ]);
  }

  /**
   * private function that returns the user to login
   * @returns void
   */
  private _routeToLogin() : void {
    this.snackBar.dismiss();
    this._router.navigate([ 'login' ]);
  }


  /**
   * provides a subscription on route events
   * @returns void
   */
  private _setupRouteSub() : void {

    this._router.events.subscribe(( event ) => {


      if (this._currentRoute !== event[ 'url' ]) {
        this._currentRoute = event[ 'url' ];
      }


      if (event instanceof RoutesRecognized) {

        if (event && event.url !== '/login' && event.url !== '/app/main') {
          this._routeRequested = event.url;
        }

      }

    });
  }


}


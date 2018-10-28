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
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
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
import * as BaseActions from '../../actions/base';


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

  private _baseState : BaseState;

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
   * @param {AuthService} _authService - provides auth service
   * @param {MatSnackBar} snackBar - Reference to snackbar
   * @param {MessageEvent} _msgEvent - message event provider
   * @param {OverlayContainer} overlayContainer - Reference to overlay container
   * @param {Router} _router - router provider
   * @param {Store<fromRoot.State>} _store - provider for the application store
   * @param {ToastEvent} _toastEvent - Provides a namespace for toast event pub/sub
   */
  constructor( private _authService : AuthService,
               private _msgEvent : MessageEvent,
               private _router : Router,
               private _store : Store<fromRoot.State>,
               private _toastEvent : ToastEvent,
               public overlayContainer : OverlayContainer,
               public snackBar : MatSnackBar ) {


  }

  /**
   * Angular life cycle method
   */
  ngOnInit() {


    this._setDefaultTheme();
    this._setupMessageSub();
    this._setupUserSub();
    this._setupRouteSub();
    this._setupToastSub();
    this._verifyCookiesEnabled();

  }


  private _setupMessageSub() : void {
    this._msgEvent.on().subscribe(( msg : any ) => {
      if (msg && msg[ 'msg' ] === 'loggedIn') {
        this._routeToPath('/app/main');
      }
    });
  }

  /**
   * Checks if cookies are enabled
   * @returns void
   */
  private _verifyCookiesEnabled() : void {
    if (navigator && !navigator.cookieEnabled) {

      setTimeout(() => {
        this._processToast({
          type: 'error',
          message: 'This site uses cookies please enable them'
        });
      }, 0);
    } else {

      this._authService.checkToken().takeWhile(() => {
        return this._compActive;
      }).subscribe(( data : any ) => {

          this._store.dispatch(new BaseActions.Update({
            ...this._baseState, loggedIn: true, authToken: data.token, loggedInUser: ''
            // ...this._baseState, loggedIn: true, authToken: data.token, loggedInUser: data[ 'user' ][ 'email' ]
          }));
          // this._routeToPath('/app/main');
          this._processLandingPage();
        },
        () => {
          setTimeout(() => {
            this._checkRoute();
          }, 0);
        });
    }
  }

  private _checkRoute() : void {
    if (!this._currentRoute.match('reset') && !this._currentRoute.match('activate') && !this._currentRoute.match('email') && !this._currentRoute.match('item')) {

      this._routeToPath('/login');
    }
  }

  /**
   * Function to process landing page.
   * @returns void
   */
  private _processLandingPage() : void {
    if (this._currentRoute === '/login' && this._baseState.loggedIn) {
      this._routeToPath('/app/main');

    }


  }

  /**
   * Setup a default theme for the application
   * @returns void
   */
  private _setupUserSub() : void {
    this._store.let(fromRoot.getBaseState).takeWhile(() => {
      return this._compActive;

    }).subscribe(( state : BaseState ) => {
      this._baseState = state;
      if (this._baseState.loggedIn) {
        this._authService.updateToken(this._baseState.authToken);

        this._routeToPath(this._currentRoute);
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
   * Process Toast Request
   * @param {ToastMsgModel} toastModel, provides incoming toast config
   * @returns void
   */
  private _processToast( toastModel : ToastMsgModel ) : void {
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
        this._closeToast();

      });

    } else {


      this._closeToast();

    }

  }

  /**
   * Setup a toast sub to update the toast component effectively
   * @returns void
   */
  private _setupToastSub() : void {

    this._toastEvent.on().subscribe(( toastModel : ToastMsgModel ) => {
      this._processToast(toastModel);
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


/**
 * Angular Imports
 */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanLoad, CanDeactivate, Router, RouterStateSnapshot
} from '@angular/router';

import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { State as BaseState } from '../reducers/base';


@Injectable()
export class ActivationViaAuthenticationGuard implements CanLoad {

  private _loggedIn : boolean = false;

  constructor( private router : Router,
               private _store : Store<fromRoot.State> ) {

    this._store.let(fromRoot.getBaseState).subscribe(( state : BaseState ) => {
      this._loggedIn = state.loggedIn;
    });
  }

  canLoad() {

    return this._loggedIn;


  }

  canActivate() {
    return this._loggedIn;

  }
}


@Injectable()
export class CanDeactivateViaSaveStatus implements CanDeactivate<any> {


  canDeactivate() {


    return true;

  }
}

@Injectable()
export class CanActivateViaPermissionGuard implements CanActivate {

  constructor( private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) : boolean {

    return true;


  }
}



/**
 * Angular Imports
 */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanLoad, CanDeactivate, Router, RouterStateSnapshot
} from '@angular/router';


@Injectable()
export class ActivationViaAuthenticationGuard implements CanLoad {

  constructor( private router : Router ) {
  }

  canLoad() {

    return true;


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



import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes, PreloadAllModules, PreloadingStrategy } from '@angular/router';

/* Guards */
import { ActivationViaAuthenticationGuard } from '../../guards/routing.guard';

/* Component */
import { ActivateComponent } from '../activate/activate.component';
import { BuyerDashboardComponent } from '../buyer/buyerDashboard.component';
import { LoginComponent } from '../shared/loginPage/login.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

const preloadStuff : boolean = true;

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload( route : Route, fn : () => Observable<boolean> ) : Observable<boolean> {

    if ((route.data && !route.data[ 'preload' ]) || !preloadStuff) {
      return Observable.of(false);
    }

    return Observable.of(true).delay(1000).mergeMap(( _ : boolean ) => fn());
  }
}

const appRoutes : Routes = [
  {
    path: '/',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'item/:sellerId/:slugId',
    component: BuyerDashboardComponent
  },
  {
    path: 'reset/:activateCode',
    component: ActivateComponent,
    data: {
      password: true
    }
  },
  {
    path: 'activate/:activateCode',
    component: ActivateComponent,
    data: {
      account: true
    }
  },
  {
    path: 'email/:activateCode',
    component: ActivateComponent,
    data: {
      email: true
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    loadChildren: '../base/base.module#BaseModule',
    canLoad: [ ActivationViaAuthenticationGuard ],
    canActivate: [ ActivationViaAuthenticationGuard ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, { preloadingStrategy: CustomPreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ActivationViaAuthenticationGuard
  ]
})


export class AppRoutingModule {}



/**
 * Required Angular Modules
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/**
 * Guards
 */
import { ActivationViaAuthenticationGuard } from '../../guards/routing.guard';

/**
 * Component
 */
import { BaseComponent } from './base.component';

const baseRoutes : Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'main',
        loadChildren: '../seller/sellerDashboard.module#SellerDashboardModule',
        data: {
          preLoad: false
        }
      },
      {
        path: 'product/:id',
        loadChildren: '../viewSellerItem/viewSellerItem.module#ViewSellerItemModule',
        data: {
          preLoad: true
        }
      },
      {
        path: 'create',
        loadChildren: '../createSellerItem/sellerItem.module#SellerItemModule',
        data: {
          preLoad: false,
          create: true
        }
      },
      {
        path: '**',
        redirectTo: '/login'
      }

    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(
      baseRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ActivationViaAuthenticationGuard
  ]
})

/**
 * @module BaseRoutingModule - provides the child routes for the module
 */
export class BaseRoutingModule {}



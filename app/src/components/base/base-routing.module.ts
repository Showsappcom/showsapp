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
      // {
      //   path: 'activate/:activationCode',
      //   loadChildren: '../activate/activate.module#ActivateModule',
      //   data: {
      //     preLoad: true
      //   }
      // },
      {
        path: 'item/:id',
        loadChildren: '../buyer/buyerDashboard.module#BuyerDashboardModule',
        data: {
          preLoad: false,
        }
      },
      {
        path: 'create',
        loadChildren: '../sellerItem/sellerItem.module#SellerItemModule',
        data: {
          preLoad: false,
          create: true
        }
      },
      {
        path: 'item/:id',
        loadChildren: '../sellerItem/sellerItem.module#SellerItemModule',
        data: {
          preLoad: false,
          create: false
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



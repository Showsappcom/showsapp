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
          preLoad: true
        }
      },
      {
        path: 'item/:id',
        loadChildren: '../buyer/buyerDashboard.module#BuyerDashboardModule',
        data: {
          preLoad: true
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



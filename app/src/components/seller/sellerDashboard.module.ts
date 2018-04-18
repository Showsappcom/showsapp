/**
 * Angular Imports
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


/**
 * Material Imports
 */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

/**
 * Custom Components
 */
import { SellerDashboardComponent } from './sellerDashboard.component';
/**
 * Seller Service
 */
import { SellerService } from '../../services/seller.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild(
      [
        {
          path: '', component: SellerDashboardComponent, pathMatch: 'full'
        }
      ]),

  ],
  declarations: [ SellerDashboardComponent ],
  exports: [ SellerDashboardComponent ],
  providers: [ SellerService ],
  schemas: []
})
export class SellerDashboardModule {}

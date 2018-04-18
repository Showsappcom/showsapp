/**
 * Angular Imports
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { SellerItemComponent } from './sellerItem.component';
/**
 * Seller Service
 */
import { SellerItemService } from '../../services/sellerItem.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {
          path: '', component: SellerItemComponent, pathMatch: 'full'
        }
      ]),

  ],
  declarations: [ SellerItemComponent ],
  exports: [ SellerItemComponent ],
  providers: [ SellerItemService ],
  schemas: []
})
export class SellerItemModule {}

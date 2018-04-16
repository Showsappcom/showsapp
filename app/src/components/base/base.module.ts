/**
 * Required Angular Modules
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

/**
 * Required Angular Material Modules
 */
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


/**
 * Custom Modules and Components
 */
import { BaseComponent } from './base.component';
import { BaseRoutingModule } from './base-routing.module';
// import { LeftNavigationModule } from '../navigation/left/leftNavigation.module';



@NgModule({
  imports: [
    BaseRoutingModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  declarations: [ BaseComponent ],
  exports: [ BaseComponent ],
  providers: [ MatDrawer ],
  schemas: []
})
/**
 * @module BaseModule - Base module, provides the base component after login
 */
export class BaseModule {}

/**
 * Required Angular Modules
 */
import {
  NgModule
} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/**
 * Required Routing Modules
 */
import { AppRoutingModule, CustomPreloadingStrategy } from './app-routing.module';

/**
 * Material Modules
 */
import { GestureConfig } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * Custom Modules
 */
import { ActivateModule } from '../activate/activate.module';
import { BaseModule } from '../base/base.module';
import { LoginModule } from '../shared/loginPage/login.module';
import { LoadingModule } from '../shared/loading/loading.module';
import { ModalsModule } from '../shared/modals/modals.module';
import { ToastModule } from '../shared/toast/toast.module';


/**
 * Store and Reducer
 */
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers';


/**
 * Custom Components
 */
import { AppComponent } from './app.component';
import { ToastComponent } from '../shared/toast/toast.component';


/**
 * Services and Events
 */
import { AuthService } from '../../services/auth.service';
import { Broadcaster } from '../../services/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import { MessageEvent } from '../../services/messageEvent.service';
import { ModalsEvent, CustomModalsEvent } from '../../services/modalsEvent.service';
import { ToastEvent } from '../../services/toastEvent.service';


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [
    ToastComponent
  ],
  imports: [
    ActivateModule,
    AppRoutingModule,
    BaseModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    LoadingModule,
    LoginModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    ModalsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducer),
    ToastModule
  ],
  providers: [
    AuthService,
    Broadcaster,
    CookieService,
    CustomModalsEvent,
    CustomPreloadingStrategy,
    DataService,
    MessageEvent,
    ModalsEvent,
    { provide: APP_BASE_HREF, useValue: '/' },
    ToastEvent,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }

  ]
})

/**
 * @module AppModule - Application module, provides the main module for the application
 */
export class AppModule {
}

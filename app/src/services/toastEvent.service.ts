/**
 * Angular Imports
 */
import { Injectable } from '@angular/core';

/**
 * Libraries
 */
import { Observable } from 'rxjs/Observable';

/**
 * Services
 */
import { Broadcaster } from './broadcaster.service';
/**
 * Models
 */
import { ToastMsgModel } from '../models/toast.model';


/**
 * @class ToastEvent - provides a name space to broadcast toast events
 */
@Injectable()
export class ToastEvent {


  /**
   * @param {Broadcaster} _broadcaster - provides the broadcaster service
   */
  constructor( private _broadcaster : Broadcaster ) {
  }

  /**
   * Provides the fire method to broadcast toast event
   * @return void
   */
  public fire( toastModel : ToastMsgModel ) : void {
    this._broadcaster.broadcast(ToastEvent, toastModel);
  }

  /**
   * Provides the on method
   * @return Observable<ToastMsgModel>
   */
  public on() : Observable<ToastMsgModel> {
    return this._broadcaster.on<ToastMsgModel>(ToastEvent);
  }
}

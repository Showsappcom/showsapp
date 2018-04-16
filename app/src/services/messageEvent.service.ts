import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Broadcaster } from './broadcaster.service';

@Injectable()
export class MessageEvent {
  constructor( private _broadcaster : Broadcaster ) {
  }

  public fire( data : any ) : void {
    this._broadcaster.broadcast(MessageEvent, data);
  }

  public on() : Observable<any> {
    return this._broadcaster.on<any>(MessageEvent);
  }
}

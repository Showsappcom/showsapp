import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Broadcaster } from './broadcaster.service';

@Injectable()
export class ModalsEvent {
  constructor( private _broadcaster : Broadcaster ) {
  }

  public fire( data : any ) : void {
    this._broadcaster.broadcast(ModalsEvent, data);
  }

  public on() : Observable<any> {
    return this._broadcaster.on<any>(ModalsEvent);
  }
}

@Injectable()
export class CustomModalsEvent {
  constructor( private _broadcaster : Broadcaster ) {
  }

  public fire( data : any ) : void {
    this._broadcaster.broadcast(CustomModalsEvent, data);
  }

  public on() : Observable<any> {
    return this._broadcaster.on<any>(CustomModalsEvent);
  }
}

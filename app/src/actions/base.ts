import { Action } from '@ngrx/store';
import { State as Base } from '../reducers/base';
import { type } from '../util';


export const ActionTypes = {
  UPDATE: type('[Base] Update')
};


export class Update implements Action {
  type = ActionTypes.UPDATE;

  constructor( public payload : Base ) {
  }
}



export type Actions = Update;

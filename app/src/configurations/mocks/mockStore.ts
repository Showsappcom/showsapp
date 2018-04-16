import { StoreModule, Action, Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import * as fromRoot from '../../reducers';

export function mockStoreFunc<T>( { actions = new Subject<Action>(), states = new Subject<T>() } : { actions? : Subject<Action>, states? : Subject<T> } ) : Store<T> {
  let result = states as any;
  result.dispatch = ( action : Action ) => actions.next(action);
  return result;
}

let actions = new Subject<Action>();
let states = new Subject<fromRoot.State>();
export const mockStore = mockStoreFunc<fromRoot.State>({ actions, states });

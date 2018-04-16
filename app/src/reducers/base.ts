import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as base from '../actions/base';


export interface State {
  authToken : string;
  loggedIn : boolean;
  loggedInUser : string;
  theme : string;
  language : string;

}


const initialState : State = {
  authToken: '',
  loggedIn: false,
  loggedInUser: '',
  theme: 'shows-app-theme',
  language: 'english'

};

export function reducer( state : State = initialState, action : base.Actions ) : State {
  switch (action.type) {
    case base.ActionTypes.UPDATE: {

      return (Object as any).assign({}, action.payload);

    }
    default:
      return state;
  }
}

export function getBase( state$ : Observable<State> ) {
  return state$.select(state => state);
}





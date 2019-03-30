import { Action } from '@ngrx/store';
import { Group } from 'src/app/model';
import { ActionTypes, AnyAction } from './group-edit.actions';


export interface State {
  group: Group;
}

export const initialState: State = {
  group: {
    name: '',
    members: []
  }
};

export function reducer(state = initialState, action: AnyAction): State {
  switch (action.type) {

    case ActionTypes.LoadSuccess: {
      return {
        ...state,
        group: action.payload,
      }
    }

    default:
      return state;
  }
}

export namespace selectors {
  export const group = (state: State) => state.group;
}

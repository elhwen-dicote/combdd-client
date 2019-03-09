import { Action } from '@ngrx/store';
import { CaracterGroup } from 'src/app/model/caracter-group.model';
import { GroupCreateActionTypes, GroupCreateActions } from './group-create.actions';


export interface State {
  group: CaracterGroup;
}

export const initialState: State = {
  group: {
    name: '',
    members: [],
  }
};

export function reducer(state = initialState, action: GroupCreateActions): State {
  switch (action.type) {

    case GroupCreateActionTypes.Set:
      return {
        ...state,
        group: {
          ...state.group,
          ...action.payload,
        }
      }

    case GroupCreateActionTypes.Reset:
      return initialState;

    default:
      return state;
  }
}

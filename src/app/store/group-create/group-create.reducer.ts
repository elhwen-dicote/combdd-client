import { Group } from 'src/app/model/group.model';
import { ActionTypes, AnyAction } from './group-create.actions';


export interface State {
  group: Group;
}

export const initialState: State = {
  group: {
    name: '',
    members: [],
  }
};

export function reducer(state = initialState, action: AnyAction): State {
  switch (action.type) {

    case ActionTypes.Set:
      return {
        ...state,
        group: {
          ...state.group,
          ...action.payload,
        }
      }

    case ActionTypes.Reset:
      return initialState;

    case ActionTypes.CaracterDeleted: {
      const id = action.payload;
      return {
        ...state,
        group: {
          ...state.group,
          members: state.group.members.filter(car => car._id !== id),
        }
      }
    }

    default:
      return state;
  }
}

export namespace selectors {
  export const group = (state: State) => state.group;
  export const members = (state: State) => state.group.members;
}

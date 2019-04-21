import { Caracter } from 'src/app/model/caracter.model';
import { AnyAction, ActionTypes } from './caracter-edit.actions';

export interface State {
  caracter: Caracter;
}

export const initialState: State = {
  caracter: {
    name: '',
    ca: 0,
    maxHp: 0,
    hp: 0,
    dext_mod: 0,
    strength_mod: 0,
  }
};

export function reducer(state = initialState, action: AnyAction): State {
  switch (action.type) {

    case ActionTypes.LoadSuccess:
      return {
        ...state,
        caracter: action.payload,
      };

    default:
      return state;
  }
}

export namespace selectors {
  export const caracter = (state: State) => state.caracter;
}

import { Action } from '@ngrx/store';
import { Caracter } from 'src/app/model/caracter.model';
import { CaracterEditActions, CaracterEditActionTypes } from './caracter-edit.actions';


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

export function reducer(state = initialState, action: CaracterEditActions): State {
  switch (action.type) {

    case CaracterEditActionTypes.LoadSuccess:
      return {
        ...state,
        caracter: action.payload,
      };

    default:
      return state;
  }
}

export const selectCaracterEditCaracter = (state: State) => state.caracter;

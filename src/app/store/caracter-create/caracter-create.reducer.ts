import { Caracter } from 'src/app/model/caracter.model';
import { CaracterCreateAction, CaracterCreateActionTypes } from './caracter-create.actions';


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

export function reducer(state = initialState, action: CaracterCreateAction): State {
  switch (action.type) {

    case CaracterCreateActionTypes.Set:
      return {
        ...state,
        caracter: checkCaracter(state.caracter, action.payload)
      };

    case CaracterCreateActionTypes.Reset:
      return initialState;

    default:
      return state;
  }
}

export const selectCaracterCreateCaracter = (state: State) => state.caracter;

function checkCaracter(caracter: Caracter, update: Partial<Caracter>): Caracter {
  let valid: Caracter = {
    ...caracter,
    ...update
  };
  if (valid.maxHp < 0) {
    valid.maxHp = 0;
  }
  return valid;
}

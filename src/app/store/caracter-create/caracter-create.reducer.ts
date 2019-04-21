import { Caracter } from 'src/app/model/caracter.model';
import { CaracterCreateAction, ActionTypes } from './caracter-create.actions';


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

    case ActionTypes.Set:
      return {
        ...state,
        caracter: checkCaracter(state.caracter, action.payload)
      };

    case ActionTypes.Reset:
      return initialState;

    default:
      return state;
  }
}

export namespace selectors {
  export const caracter = (state: State) => state.caracter;
}

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
